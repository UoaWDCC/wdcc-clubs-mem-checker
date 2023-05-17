import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import { BackSquare } from 'iconsax-react';
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
      <button id={styles.backButton} onClick={onBack}>
        <BackSquare size={32}/>
      </button>
      <div>
        <div className={styles.title}>
          <h1>select & edit columns</h1>
          <img src={GoogleSheetsLogo} />
        </div>
        <i>
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
