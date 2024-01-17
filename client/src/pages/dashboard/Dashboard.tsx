import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import CheckerPageMetrics from './components/CheckerPageMetrics';
import ClubAdminsList from './components/ClubAdminsList';
import GenerateInviteCode from './components/GenerateInviteCode';
import axios from 'axios';
import CheckerPagePreview from './components/CheckerPagePreview';
import WDCCLogoBlue from '../../assets/wdcc_blue_logo.svg';
import SelectClubDropdown from './components/SelectClubDropdown';
import ClubSize from './components/ClubSize';
import IDashboardContext from '../../types/IDashboardContext';
import IDropdownClub from '../../types/IDropdownClub';
import CircularProgress from '@mui/material/CircularProgress';
import IDashboardPage from '../../../../api/routes/types/IDashboardPage';
import { useNavigate } from 'react-router';

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const Dashboard = () => {
  // retrieve user's list of clubs
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState<IDropdownClub[]>([]);
  useEffect(() => {
    axios
      .get(`/user/organisations`)
      .then((response) => {
        if (response.status == 200) {
          if (response.data.length == 0) navigate('/no-clubs');
          setUserClubs(response.data);
        } else {
          navigate('/no-clubs');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // load cached selected club
  const storedSelectedClub = localStorage.getItem('selectedClub');

  const [dashboard, setDashboard] = useState<IDashboardContext>({
    selectedClub: storedSelectedClub
      ? JSON.parse(storedSelectedClub)
      : undefined,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingHeight, setLoadingHeight] = useState('100%');
  const containerRef = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    setLoadingHeight(`${containerRef.current?.offsetHeight}px`);
  });

  const [cancelTokenSource, setCancelTokenSource] = useState(
    axios.CancelToken.source()
  );

  useEffect(() => {
    if (dashboard.selectedClub?.id === undefined) {
      return;
    }
    setIsLoading(true);
    cancelTokenSource.cancel('Cancel getting club info due to switching club');
    const newCancelToken = axios.CancelToken.source();
    setCancelTokenSource(newCancelToken);
    axios
      .get(`/dashboard/${dashboard.selectedClub?.id}`, {
        cancelToken: newCancelToken.token,
      })
      .then((response) => {
        const data: IDashboardPage = response.data;
        setDashboard({
          ...dashboard,
          dashboardPage: data,
          selectedPageIndex: data.pages.length > 0 ? 0 : undefined,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error(error);
        }
      });
  }, [dashboard.selectedClub]);

  return (
    <DashboardContextProvider.Provider value={[dashboard, setDashboard]}>
      <div
        className="w-full p-10 flex flex-col bg-[#E6E9F1]"
        ref={containerRef}
      >
        {isLoading && (
          <div
            style={{ height: `${loadingHeight}` }}
            className="items-center bg-[#00000044] flex justify-center left-0 min-h-full absolute top-0 w-full z-3"
          >
            <CircularProgress
              sx={{
                position: 'absolute',
                color: '#FFFFFF',
              }}
              size="3vh"
            />
          </div>
        )}
        <div className="flex justify-between">
          <h2 className="text-[#087df1] text-5xl font-sans font-semibold">
            dashboard
          </h2>

          <img
            className="justify-self-end"
            src={WDCCLogoBlue}
            alt="WDCC Logo"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-[white] rounded-2xl w-full">
              {userClubs.length > 0 && <SelectClubDropdown clubs={userClubs} />}
            </div>
            <div className="flex justify-center bg-[white] rounded-2xl w-full">
              <ClubAdminsList />
            </div>
            <div className="flex justify-center bg-[white] rounded-2xl w-full">
              <GenerateInviteCode />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="bg-[white] rounded-2xl">
              <CheckerPagePreview />
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[white] rounded-2xl p-8 pb-16">
                <ClubSize />
              </div>
              <div className="bg-[white] rounded-2xl h-full">
                <CheckerPageMetrics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
};

export default Dashboard;
