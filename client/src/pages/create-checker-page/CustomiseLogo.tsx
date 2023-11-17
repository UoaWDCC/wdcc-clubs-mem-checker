import styles from "./style.module.css";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import UploadButton from "./CustomiseLogo Components/UploadButton";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";

interface CustomiseLogoProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseLogo = ({ onNext, onBack }: CustomiseLogoProps) => {
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
          <i className={styles.subtitle} style={{ fontWeight: 500 }}>
            customise page for your members
          </i>
          <p className={styles.optionalText}>
            please upload your club's logo (optional)
          </p>
          <div>
            <UploadButton
              onFileSelect={(file) =>
                setContext({
                  ...context,
                  page: {
                    ...context.page,
                    // @ts-ignore
                    logoLink: file,
                  },
                })
              }
              // @ts-ignore
              currentFile={context.page.logoLink} // Pass the current file from the page state
            />
          </div>
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button
            onClick={onNext}
            buttonText="next"
            width="7vw"
            height="4.5vh"
          />
        </div>
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
              context.page.logoLink
                ? // @ts-ignore
                  URL.createObjectURL(context.page.logoLink!)
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

export default CustomiseLogo;
