import { SetStateAction, useEffect, useState } from "react";
import GoogleSheetForm from "./GoogleSheetForm";
import Background from "../../components/Background";
import ColumnSelector from "./ColumnSelector";
import styles from "./style.module.css";
import CustomiseTitle from "./CustomiseTitle";
import CustomiseFont from "./CustomiseFont";
import CustomiseColors from "./CustomiseColors";
import CustomiseLogo from "./CustomiseLogo";
import CustomiseBackground from "./CustomiseBackground";
import CustomiseConfirm from "./CustomiseConfirm";
import { createContext } from "react";
import Column from "../../types/Column";
import { useLocation } from "react-router";
import { ClubDetails } from "../club-detail-page/ClubDetailPage";

export interface Page {
  googleSheetLink?: string;
  identificationColumns?: Column[];
  title?: string;
  font?: string;
  backgroundColor?: string;
  titleTextColor?: string;
  textFieldBackgroundColor?: string;
  textFieldtextColor?: string;
  buttonColor?: string;
  dropDownBackgroundColor?: string;
  logoLink?: File;
  backgroundImageLink?: File;
  clubSize?: number;
}

export const PageContextProvider = createContext([{}, () => {}]);

const CreateCheckerPage = () => {
  const [progress, setProgress] = useState(1);
  const onNext = () => setProgress(progress + 1);
  const onBack = () => setProgress(progress - 1);

  const clubDetails = useLocation().state as ClubDetails;

  useEffect(() => {
    setPage({
      ...page,
      title: clubDetails.clubAcronym + " Membership Checker",
    });
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);
  const onConfirm = () => {
    console.log("confirmed");
  };

  const steps: Map<number, JSX.Element> = new Map([
    [1, <GoogleSheetForm onNext={onNext} />],
    [2, <ColumnSelector onNext={onNext} onBack={onBack} />],
    [3, <CustomiseTitle onNext={onNext} onBack={onBack} />],
    [4, <CustomiseFont onNext={onNext} onBack={onBack} />],
    [5, <CustomiseColors onNext={onNext} onBack={onBack} />],
    [6, <CustomiseLogo onNext={onNext} onBack={onBack} />],
    [
      7,
      <CustomiseBackground
        onNext={() => setShowConfirm(true)}
        onBack={onBack}
      />,
    ],
  ]);

  const [page, setPage] = useState<Page>({}); // might need default values?

  return (
    <Background>
      <div id={styles.progressBarContainer}>
        <div id={styles.progressBar}>
          {Array.from(steps).map((keyValue) => {
            const key = keyValue[0];
            return (
              <div
                className={styles.bar}
                key={key}
                style={key === progress ? { opacity: 1 } : {}}
              />
            );
          })}
        </div>
        <p style={{ marginLeft: "10px" }}>
          {progress} of {steps.size}
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
          steps.get(progress)
        )}
      </PageContextProvider.Provider>
    </Background>
  );
};

export default CreateCheckerPage;
