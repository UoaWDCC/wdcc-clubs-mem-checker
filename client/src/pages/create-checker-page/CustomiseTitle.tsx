import styles from "./style.module.css";
import BackButton from "../../components/BackButton";
import {
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  createRef,
  useEffect,
} from "react";

import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";

interface CustomiseTitleProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseTitle = ({ onNext, onBack }: CustomiseTitleProps) => {
  const [error, setError] = useState<boolean>(false);
  const titleRef = createRef();
  const [context, setContext] = useContext(PageContextProvider) as [
    ICreateCheckerPageContext,
    Dispatch<SetStateAction<ICreateCheckerPageContext>>
  ];
  useEffect(() => {
    (titleRef.current as HTMLInputElement).setAttribute(
      "value",
      context.page.title || ""
    );
  }, []);

  const handleNext = () => {
    const title = (titleRef.current as HTMLInputElement).value;
    if (title === "") {
      setError(true);
    } else {
      onNext();
    }
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
        <div className={styles.title}>
          <h1>customise page</h1>
        </div>
        <i className={styles.subtitle} style={{ fontWeight: 500 }}>
          customise page for your members
        </i>
        <div style={{ marginTop: "10vh" }}>
          <p style={{ color: "#AAAAAA", fontStyle: "italic", float: "left" }}>
            please edit your title
          </p>
          <Textfield
            width="20vw"
            height="5vh"
            fontSize="2.5vh"
            ref={titleRef}
            errorText="please enter a title to continue"
            isError={error}
            onChange={() => {
              setError(false);
              setContext({
                ...context,
                page: {
                  ...context.page,
                  title: (titleRef.current as HTMLInputElement).value,
                },
              });
            }}
          />
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button
            onClick={handleNext}
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

export default CustomiseTitle;
