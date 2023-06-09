import styles from "./style.module.css";

import BackArrow from "../../assets/BackArrow.svg";
import {
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  createRef,
  useEffect,
} from "react";

import { PageContextProvider, Page } from "./CreateCheckerPage";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import BlueBackButton from "../../components/BlueBackButton";

interface CustomiseTitleProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseTitle = ({ onNext, onBack }: CustomiseTitleProps) => {

  const [error, setError] = useState<boolean>(false);
  const titleRef = createRef();
  const [page, setPage] = useContext(PageContextProvider) as [

    Page,
    Dispatch<SetStateAction<Page>>
  ];
  useEffect(() => {
    (titleRef.current as HTMLInputElement).setAttribute(
      "value",
      page.title || ""
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
          <BlueBackButton onClick={onBack} />
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
              setPage({
                ...page,
                title: (titleRef.current as HTMLInputElement).value,
              });
            }}
          />

        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button onClick={handleNext} buttonText="next" width="5vw" />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseTitle;
