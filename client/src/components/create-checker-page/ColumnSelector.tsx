import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { useContext, Dispatch, SetStateAction, useState } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import DropDown from '../Dropdown';
import SelectColumns from '../ColumnSelect';
import ColumnSelectRow from "../ColumnSelectRow";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

interface Column {
  originalName: string
  displayName: string
}


const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const[dropdownText, setDropdownText] = useState('select default column')
  
  const selectedColumnsList : Column[] = [];
  console.log(selectedColumnsList);

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
        {/* <div className={styles.dropdownButtonContainer}>
          <DropDown columns={['column1', 'column2', 'column3', 'column4']} setDropdownText={setDropdownText} dropdownText={dropdownText}
          onColumnClick={(column) => {console.log(column)} }
          /> */}
        {/* </div> */}
        {/* <i className={styles.pickColumnsDescription}>
          please select the google sheet columns you want to use as
          identification options
        </i> */}
      </div>

      

      {/* <div className={styles.columnContainer}>
        <SelectColumns columns={['column1', 'column2', 'column3', 'column4', 'column5', 'column6']} dropdownText={dropdownText}></SelectColumns>
      </div> */}

      <ColumnSelectRow originalName="column1" 
      customName={(originalName, newCustName) => {const index = selectedColumnsList.findIndex(obj => {return obj.originalName === originalName}); selectedColumnsList[index].displayName = newCustName}} 
      onCheckChange={(originalName, newCheckedValue) => {selectedColumnsList.push({originalName, displayName: originalName}); console.log(selectedColumnsList)}}
      ></ColumnSelectRow>

      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
