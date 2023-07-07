import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  return (
    <div className={styles.container}>
      <div id = {styles.backButton}>
          <BackButton
            onClick={onBack}
            color="#087DF1"
            size="45px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin="0 500px 0 0"
          />
      </div>
      <div>
        <div className={styles.title}>
          <h1>select & edit columns</h1>
          <img src={GoogleSheetsLogo} />
        </div>
        <i className={styles.subtitle}>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>
      <div className={styles.body}>image</div>
      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
