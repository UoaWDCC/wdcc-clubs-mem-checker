import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { useContext, Dispatch, SetStateAction, useState } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import DropDown from '../Dropdown';
import SelectColumns from '../ColumnSelect'

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const[dropdownText, setDropdownText] = useState('select default column')


  return (
    <div className={styles.container}>
      <button id={styles.backButton} onClick={onBack}>
        <img className={styles.backButton} src={BackArrow} />
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

      <div>
        <DropDown columns={['column1', 'column2', 'column3']} setDropdownText={setDropdownText} dropdownText={dropdownText}
        onColumnClick={(column) => {console.log(column)} }
        />
      </div>

      <div className={styles.columnContainer}>
        <SelectColumns columns={['column1', 'column2', 'column3', 'column4', 'column5', 'column6']} dropdownText={dropdownText}></SelectColumns>
      </div>

      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
