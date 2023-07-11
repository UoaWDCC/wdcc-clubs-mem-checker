import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import DropDown from '../Dropdown';
// import SelectColumns from '../ColumnSelect';
import ColumnSelectRow from "../ColumnSelectRow";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

interface Column {
  originalName?: string
  displayName?: string
}


const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const [defaultColumn, setDefaultColumn] = useState(() => {
    const storedColumn = localStorage.getItem('defaultColumn');
    return storedColumn !== null ? storedColumn : '';
  });

  useEffect(() => {
    localStorage.setItem('defaultColumn', defaultColumn);
  }, [defaultColumn]);


  const columns = ['column1', 'column2', 'column3', 'column4', 'column5'];
  
  //trial persisting
  const [selectedColumnsList, setSelectedColumnsList] = useState(() => {
    const storedColumnsList = localStorage.getItem('selectedColumnsList');
    return storedColumnsList ? JSON.parse(storedColumnsList) : [{ originalName: defaultColumn, displayName: defaultColumn }];
  });

  useEffect(() => {
    localStorage.setItem('selectedColumnsList', JSON.stringify(selectedColumnsList));
  }, [selectedColumnsList]);

  const addColumn = (newColumn: Column) => {
    setSelectedColumnsList((prevList : Column[]) => {
      const updatedList = [...prevList, newColumn];
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeColumn = (columnToRemove: Column) => {
    setSelectedColumnsList((prevList: Column[]) => {
      const updatedList = prevList.filter((item) => item.originalName !== columnToRemove.originalName);
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };
  
  // const selectedColumnsList : Column[] = [{originalName: defaultColumn, displayName: defaultColumn}];
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
        <div className={styles.dropdownButtonContainer}>
          <DropDown columns={columns} setDefaultColumn={setDefaultColumn} defaultColumn={defaultColumn}
          onColumnClick={(column) => {console.log(column)} }
          />
        </div>
        <i className={styles.pickColumnsDescription}>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>

      {/* <div className={styles.columnContainer}>
        <SelectColumns columns={['column1', 'column2', 'column3', 'column4', 'column5', 'column6']} dropdownText={dropdownText}></SelectColumns>
      </div> */}

      <div className={styles.columnsContainer}>{columns.map((column) => <ColumnSelectRow key={column} originalName={column} 
      customName={(originalName, newCustName) => {
        const index = selectedColumnsList.findIndex(obj => {
          return obj.originalName === originalName
        }); 
        selectedColumnsList[index].displayName = newCustName;
        console.log(selectedColumnsList);
      }} 
      onCheckChange={(originalName, newCheckedValue) => {
        //if (newCheckedValue) {selectedColumnsList.push({originalName, displayName: originalName})}
        if (newCheckedValue) {addColumn({originalName, displayName: originalName})}
        else{
          const index = selectedColumnsList.findIndex(obj => {return obj.originalName === originalName})
          removeColumn(selectedColumnsList[index])
          // const index = selectedColumnsList.findIndex(obj => {return obj.originalName === originalName})
          // selectedColumnsList.splice(index, 1);
        }
        console.log(selectedColumnsList)
      }} isDefaultColumn={defaultColumn === column ? true : false}></ColumnSelectRow>)}</div>

      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
