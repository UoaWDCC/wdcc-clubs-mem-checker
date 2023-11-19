import styles from "./style.module.css";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import {
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import UploadButton from "./CustomiseLogo Components/UploadButton";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";
import { getImageFileFromUrl } from "../../utils/helpers";

interface CustomiseBackgroundProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseBackground = ({ onNext, onBack }: CustomiseBackgroundProps) => {
  const [context, setContext] = useContext(PageContextProvider) as [
    ICreateCheckerPageContext,
    Dispatch<SetStateAction<ICreateCheckerPageContext>>
  ];

  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (context.page.backgroundImageLink) {
      getImageFileFromUrl(context.page.backgroundImageLink, "background.png")
        .then((file) => {
          setFile(file);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }, [context]);

  const handleFileSelect = (selectedFile: File | null) => {
    const fileUrl = selectedFile
      ? URL.createObjectURL(selectedFile)
      : undefined;
    setContext({
      ...context,
      page: {
        ...context.page,
        backgroundImageLink: fileUrl,
      },
    });
  };

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
            upload a background image (optional)
          </p>
          <div>
            <UploadButton onFileSelect={handleFileSelect} />
          </div>
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button onClick={onNext} buttonText="next" width="5vw" />
        </div>
        <button id={styles.CustomisePageNextButton} onClick={onNext}>
          next
        </button>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}>
          <ClubCheckerPage
            clubId={0}
            clubName={""}
            title={context.page.title}
            backgroundColor={context.page.backgroundColor}
            titleTextColor={context.page.titleTextColor}
            textFieldBackgroundColor={context.page.textFieldBackgroundColor}
            textFieldTextColor={context.page.textFieldtextColor}
            buttonBackgroundColor={context.page.buttonColor}
            dropDownBackgroundColor={context.page.dropDownBackgroundColor}
            font={context.page.font}
            clubLogoUrl={context.page.logoLink}
            backgroundImageUrl={context.page.backgroundImageLink}
            optionsList={context.page.identificationColumns || []}
            isOnboarding={true}
          />
        </div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseBackground;
