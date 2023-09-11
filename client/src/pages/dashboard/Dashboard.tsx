import React, { createRef, useEffect, useLayoutEffect, useState } from "react";
import CheckerPageMetrics from "./components/CheckerPageMetrics";
import ClubAdminsList from "./components/ClubAdminsList";
import styles from "./style.module.css";
import GenerateInviteCode from "./components/GenerateInviteCode";
import axios from "axios";
import CheckerPagePreview from "./components/CheckerPagePreview";
import WDCCLogoBlue from "../../assets/wdcc_blue_logo.svg";
import SelectClubDropdown from "./components/SelectClubDropdown";
import ClubSize from "./components/ClubSize";
import IDashboardContext from "../../types/IDashboardContext";
import IDropdownClub from "../../types/IDropdownClub";
import CircularProgress from "@mui/material/CircularProgress";

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const Dashboard = () => {
  // retrieve user's list of clubs
  const [userClubs, setUserClubs] = useState<IDropdownClub[]>([]);
  useEffect(() => {
    axios
      .get(`/user/organisations`)
      .then((response) => {
        if (response.status == 200) {
          setUserClubs(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // load cached selected club
  const storedSelectedClub = localStorage.getItem("selectedClub");

  const [dashboard, setDashboard] = useState<IDashboardContext>({
    selectedClub: storedSelectedClub
      ? JSON.parse(storedSelectedClub)
      : undefined,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingHeight, setLoadingHeight] = useState("100%");
  const containerRef = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    setLoadingHeight(`${containerRef.current?.offsetHeight}px`);
  });

  const [cancelTokenSource, setCancelTokenSource] = useState(
    axios.CancelToken.source()
  );

  useEffect(() => {
    setIsLoading(true);
    cancelTokenSource.cancel("Cancel getting club info due to switching club");
    const newCancelToken = axios.CancelToken.source();
    setCancelTokenSource(newCancelToken);
    axios
      .get(`/dashboard/club-dashboard-endpoint/${dashboard.selectedClub?.id}`, {
        cancelToken: newCancelToken.token,
      })
      .then((response) => {
        setDashboard({
          ...dashboard,
          dashboardPage: response.data,
          selectedPageIndex: 0,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      });
  }, [dashboard.selectedClub]);

  // temporary clubs array for dropdown
  // TODO: retrieve clubs of user and create array of type DropdownClub[]
  const testDropdownClubs: IDropdownClub[] = [
    { id: 1, name: "WDCC" },
    { id: 84, name: "testing" },
    { id: 85, name: "random" },
    { id: 102, name: "Alex's Music Club" },
  ];
  return (
    <DashboardContextProvider.Provider value={[dashboard, setDashboard]}>
      <div className={styles.dashboardContainer} ref={containerRef}>
        {isLoading && (
          <div
            style={{ height: `${loadingHeight}` }}
            className={styles.loadingContainer}
          >
            <CircularProgress
              className={styles.loadingSign}
              sx={{
                position: "absolute",
                color: "#FFFFFF",
              }}
              size="3vh"
            />
          </div>
        )}
        <div className={styles.dashboardHeadingContainer}>
          <h2 className={styles.dashboardHeading}>dashboard</h2>

          <img className={styles.logo} src={WDCCLogoBlue} alt="WDCC Logo" />
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.rowOne}>
            <div
              className={`${styles.clubsContainer} ${styles.dashboardItemContainer}`}
            >
              <SelectClubDropdown clubs={userClubs} />
            </div>
            <div
              className={`${styles.adminShareContainer} ${styles.dashboardItemContainer}`}
            >
              <ClubAdminsList />
            </div>
            <div
              className={`${styles.clubAdminContainer} ${styles.dashboardItemContainer}`}
            >
              <GenerateInviteCode />
            </div>
          </div>

          <div className={styles.rowTwo}>
            <div
              className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}
            >
              {dashboard.dashboardPage?.pages && (
                <CheckerPagePreview pages={dashboard.dashboardPage.pages} />
              )}
            </div>
            <div className={styles.colTwoRowTwo}>
              <div
                className={`${styles.clubMembersContainer} ${styles.dashboardItemContainer}`}
              >
                <ClubSize />
              </div>
              <div
                className={`${styles.usersContainer} ${styles.dashboardItemContainer}`}
              >
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
