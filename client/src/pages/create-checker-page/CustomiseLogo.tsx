import styles from "./style.module.css";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import Page from "../../types/Page";
import UploadButton from "../../components/UploadButton";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";

interface CustomiseLogoProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseLogo = ({ onNext, onBack }: CustomiseLogoProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div id={styles.CustomisePageBackButton}>
          <BackButton
            onClick={onBack}
            color="#087DF1"
            size="27px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin="0 500px 0 0"
          />
        </div>
        <div>
          <h2 className={styles.customisePageTitle}>customise page</h2>
          <i className={styles.subtitle}>customise page for your members</i>
          <p className={styles.optionalText}>
            please upload your club's logo (optional)
          </p>
          <div>
            <UploadButton
                onFileSelect={(file) => setPage({ ...page, logoLink: file })}
                currentFile={page.logoLink} // Pass the current file from the page state
            />
          </div>
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button onClick={onNext} buttonText="next" width="5vw" />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}>
          <ClubCheckerPage
            clubId={0}
            clubName={""}
            title={page.title}
            backgroundColor={page.backgroundColor}
            titleTextColor={page.titleTextColor}
            textFieldBackgroundColor={page.textFieldBackgroundColor}
            textFieldTextColor={page.textFieldtextColor}
            buttonBackgroundColor={page.buttonColor}
            dropDownBackgroundColor={page.dropDownBackgroundColor}
            font={page.font}
            clubLogoUrl={page.logoLink}
            backgroundImageUrl={page.backgroundImageLink}
            optionsList={page.identificationColumns || []}
            isOnboarding={true}
          />
        </div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseLogo;
