import styles from "./style.module.css";
import { Warning2 } from "iconsax-react";
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

  const [showError, setShowError] = useState(false);


  const handleNext = () => {
    if (defaultColumn !== '') {
      // Proceed to the next step
      onNext();
    } else {
      setShowError(true)
      // Show error or perform error handling
      console.error('Default column is null');
      // You can display an error message or handle the error in any other way
    }
  };

  const columns = ['column1', 'column2', 'column3', 'column4', 'column5'];
  
  //trial persisting
  const [selectedColumnsList, setSelectedColumnsList] = useState(() => {
    const storedColumnsList = localStorage.getItem('selectedColumnsList');
    return storedColumnsList ? JSON.parse(storedColumnsList) : [];
  });

  useEffect(() => {
    console.log("updating selectedColumnsList");
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

  function isObjectChecked(name : string) {
    return selectedColumnsList.some(obj => obj.originalName === name);
  }


  console.log(selectedColumnsList);
  //console.log(defaultColumn)

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
          <DropDown onColumnClick={(column) => {
            const index : number = selectedColumnsList.findIndex(obj => {return obj.originalName === column});
            const defaultIndex : number = selectedColumnsList.findIndex(newObj => {return newObj.originalName === defaultColumn});
            if (defaultIndex != -1){
              removeColumn({originalName: defaultColumn, displayName: selectedColumnsList[defaultIndex].displayName})
            }
            if (index == -1){
              addColumn({originalName: column, displayName: column})
            }
            setDefaultColumn(column)
            setShowError(false)
            console.log(column)
          } }

          columns={columns} setDefaultColumn={setDefaultColumn} defaultColumn={defaultColumn}
          
          />
          {showError && <div className={styles.errorMessage}><Warning2 size="18" color="#FF0000"/><p className={styles.errorText}>select a default column</p></div>}
        </div>
        <i className={styles.pickColumnsDescription}>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>

      {/* <div className={styles.columnContainer}>
        <SelectColumns columns={['column1', 'column2', 'column3', 'column4', 'column5', 'column6']} dropdownText={dropdownText}></SelectColumns>
      </div> */}

      <div className={styles.columnsContainer}>{columns.map((column) => <ColumnSelectRow defaultColumn={defaultColumn}  key={column} originalName={column} 
      customName={(originalName, newCustName) => {
        const index = selectedColumnsList.findIndex(obj => {
          return obj.originalName === originalName
        }); 
        const tempSelectedColumnsList = selectedColumnsList;
        setSelectedColumnsList([...selectedColumnsList, ])
        tempSelectedColumnsList[index].displayName = newCustName;
        setSelectedColumnsList(tempSelectedColumnsList);
        localStorage.setItem('selectedColumnsList', JSON.stringify(selectedColumnsList));
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
      }} isDefaultColumn={(column : string) => column == defaultColumn} isCheckedPersisted={isObjectChecked(column)}></ColumnSelectRow>)}</div>

      <button id={styles.nextButton} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
