import styles from "./style.module.css";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import UploadButton from "./CustomiseLogo Components/UploadButton";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";

interface CustomiseBackgroundProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseBackground = ({ onNext, onBack }: CustomiseBackgroundProps) => {
  const [context, setContext] = useContext(PageContextProvider) as [
    ICreateCheckerPageContext,
    Dispatch<SetStateAction<ICreateCheckerPageContext>>
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
            upload a background image (optional)
          </p>
          <div>
            <UploadButton
              // @ts-ignore
              onFileSelect={(file) =>
                setContext({
                  ...context,
                  // @ts-ignore can we fix this?
                  page: { ...context.page, backgroundImageLink: file },
                })
              }
              // @ts-ignore
              currentFile={page.backgroundImageLink} // Pass the current file from the page state
            />
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
            clubLogoUrl={
              // @ts-ignore
              context.page.logoLink
                ? URL.createObjectURL(page.logoLink!)
                : undefined
            }
            backgroundImageUrl={
              context.page.backgroundImageLink
                ? // @ts-ignore
                  URL.createObjectURL(context.page.backgroundImageLink!)
                : undefined
            }
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
