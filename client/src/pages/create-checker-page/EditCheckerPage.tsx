import { SetStateAction, useEffect, useState } from 'react';
import GoogleSheetForm from './GoogleSheetForm';
import Background from '../../components/Background';
import ColumnSelector from './ColumnSelector';
import styles from './style.module.css';
import CustomiseTitle from './CustomiseTitle';
import CustomiseFont from './CustomiseFont';
import CustomiseColors from './CustomiseColors';
import CustomiseLogo from './CustomiseLogo';
import CustomiseBackground from './CustomiseBackground';
import CustomiseConfirm from './CustomiseConfirmEdit';
import { createContext } from 'react';
import IColumn from '../../types/IColumn';
import { useLocation, useParams } from 'react-router';
import { IClubDetails } from '../club-detail-page/ClubDetailPage';
import IPage from '../../types/IPage';
import axios from 'axios';
import WebFont from 'webfontloader';
import { CircularProgress } from '@mui/material';
import Instructions from './Instructions';

export const PageContextProvider = createContext([{}, () => {}]);

interface EditCheckerPageProps {
  isEdit: boolean;
}

const EditCheckerPage = ({ isEdit }: EditCheckerPageProps) => {
  const { webLinkId } = useParams();
  const [progress, setProgress] = useState(0);
  const onNext = () => setProgress(progress + 1);
  const onBack = () => setProgress(progress - 1);

  const clubDetails = useLocation().state as IClubDetails;

  useEffect(() => {
    if (!isEdit) return;
    axios
      .get(`/pages/protected-info/${webLinkId}`)
      .then((response) => {
        WebFont.load({
          google: {
            families: [response.data!.font!],
          },
        });
        console.log(`response.data = ${JSON.stringify(response.data)}`);
        setPage({
          ...response.data,
          webLink: webLinkId,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);
  const onConfirm = () => {
    console.log('confirmed');
  };

  const [page, setPage] = useState<IPage>({}); // might need default values?

  const steps = [
    <Instructions
      onNext={onNext}
      isLoading={isEdit && !page.googleSheetLink}
    />,
    <GoogleSheetForm
      onNext={onNext}
      onBack={onBack}
    />,
    <ColumnSelector
      onNext={onNext}
      onBack={onBack}
    />,
    <CustomiseTitle
      onNext={onNext}
      onBack={onBack}
    />,
    <CustomiseFont
      onNext={onNext}
      onBack={onBack}
    />,
    <CustomiseColors
      onNext={onNext}
      onBack={onBack}
    />,
    <CustomiseLogo
      onNext={onNext}
      onBack={onBack}
    />,
    <CustomiseBackground
      onNext={() => setShowConfirm(true)}
      onBack={onBack}
    />,
  ];

  return (
    <Background>
      <div className="text-[white] flex flex-col p-12 hidden lg:flex">
        <div className="gap-2 flex flex-row">
          {steps.map((keyValue, index) => {
            return (
              <div
                className="bg-[#087df1] border-none rounded-lg h-[8px] w-[65px] opacity-75"
                key={index}
                style={index + 1 === progress ? { opacity: 1 } : {}}
              />
            );
          })}
        </div>
        <p className="text-[#087df1]">
          {progress} of {steps.length}
        </p>
      </div>

      <PageContextProvider.Provider value={[page, setPage]}>
        {showConfirm ? (
          <CustomiseConfirm
            clubDetails={clubDetails}
            onNext={onConfirm}
            onBack={() => setShowConfirm(false)}
          />
        ) : (
          steps[progress]
        )}
      </PageContextProvider.Provider>
    </Background>
  );
};

export default EditCheckerPage;
