import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";

interface CustomiseTitleProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseTitle = ({ onNext, onBack }: CustomiseTitleProps) => {
  const [page, setPage] = useContext(PageContextProvider)  as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div id = {styles.CustomisePageBackButton}>
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
          <h2>customise page</h2>
          <i className={styles.subtitle}>customise page for your members</i>
        </div>
        <div>
          <p>please edit your title</p>
          <input type="text" placeholder="title" />
        </div>
        <button id={styles.CustomisePageNextButton} onClick={onNext}>
          next
        </button>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseTitle;
