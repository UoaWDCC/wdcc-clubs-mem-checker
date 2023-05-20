import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import { BackSquare } from 'iconsax-react';
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
        <Button
          buttonText=""
          onClick={onBack}
          iconFromIconsax={<BackSquare/>}
          iconSize="50px"
          height="45px"
          width="45px"
          backgroundColor="transparent"
          margin="0 500px 0 0"
          color="#087DF1"
          hoverColor="#cceeff"
          padding="0px"
          translateX="-2.5px"
          translateY="-2.5px"
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
