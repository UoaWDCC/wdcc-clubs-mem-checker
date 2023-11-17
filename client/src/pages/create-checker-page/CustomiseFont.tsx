import { useState } from "react";
import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { Dispatch, SetStateAction, useContext } from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import FontPicker from "react-fontpicker-ts";
import "react-fontpicker-ts/dist/index.css";
import { ArrowDown2 } from "iconsax-react";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";

interface CustomiseFontProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseFont = ({ onNext, onBack }: CustomiseFontProps) => {
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
        <div className={styles.title}>
          <h1>customise page</h1>
        </div>
        <i className={styles.subtitle} style={{ fontWeight: 500 }}>
          customise page for your members
        </i>
        <div className={styles.styling_container}>
          <p className={styles.styling_subtext}>please choose a font</p>
          <ArrowDown2
            style={{
              position: "absolute",
              zIndex: "2",
              top: "30px",
              left: "calc(100% - 50px)",
            }}
            size="32"
            color="#AAAAAA"
          />
          <FontPicker
            autoLoad
            defaultValue={context.page.font || "Montserrat"}
            fontCategories={["serif", "sans-serif"]}
            value={(font: string) => {
              setContext({
                ...context,
                page: {
                  ...context.page,
                  font: font,
                },
              });
            }}
          />
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

export default CustomiseFont;
