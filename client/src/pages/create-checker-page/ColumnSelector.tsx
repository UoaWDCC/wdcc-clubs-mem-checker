import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import { Warning2 } from "iconsax-react";
import DropDown from '../../components/Dropdown';
import ColumnSelectRow from "../../components/ColumnSelectRow";
import { spreadsheetColumns } from "./GoogleSheetForm";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

interface Column {
  originalName?: string | boolean;
  displayName?: string | boolean;
}

const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  // const testColumns = {'Awesome_A': {"id": "A", "name": "Awesome", "unique": true}, 'Bwesome_B':{"id": "B", "name": "Bwesome", "unique": false}, 'Cwesome_C':{"id": "C", "name": "Cwesome", "unique": false}}

  const [googleSheetColumns, setgoogleSheetColumns] = useState<Array<[string, boolean]>>(
    Object.entries(spreadsheetColumns).map(([key, value]) => [value.name, value.unique])
  );

  // Setting default column and storing this using client local storage
  const [defaultColumn, setDefaultColumn] = useState(() => {
    const storedColumn = localStorage.getItem('defaultColumn');
    return storedColumn !== null ? storedColumn : '';
  });

  useEffect(() => {
    localStorage.setItem('defaultColumn', defaultColumn);
  }, [defaultColumn]);

  
  // Storing the checked columns using client local storage
  const [selectedColumnsList, setSelectedColumnsList] = useState(() => {
    const storedColumnsList = localStorage.getItem('selectedColumnsList');
    return storedColumnsList ? JSON.parse(storedColumnsList) : [];
  });

  // Updating checked columns each time checked columns change
  useEffect(() => {
    console.log("updating selectedColumnsList");
    localStorage.setItem('selectedColumnsList', JSON.stringify(selectedColumnsList));
  }, [selectedColumnsList]);

  // Add column to selectedColumnsList
  const addColumn = (newColumn: Column) => {
    setSelectedColumnsList((prevList : Column[]) => {
      const updatedList = [...prevList, newColumn];
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Remove column from selectedColumnsList
  const removeColumn = (columnToRemove: Column) => {
    setSelectedColumnsList((prevList: Column[]) => {
      const updatedList = prevList.filter((item) => item.originalName !== columnToRemove.originalName);
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };
  
  // Used to persist styles in ColumnSelectRow 
  function isObjectChecked(name : string) {
    return selectedColumnsList.some((obj: Column) => obj.originalName === name);
  }

  function findDisplayName(name : string) {
    const foundColumn = selectedColumnsList.find((column : Column) => column.originalName === name);
    return foundColumn ? foundColumn.displayName : name;
  }

  // Error handling if next button is clicked but default column hasn't been selected
  const [showError, setShowError] = useState(false);
  const handleOnNext = () => {
    if (defaultColumn != '') {
      setPage({
        ...page,
        identificationColumns: selectedColumnsList,
      });
      onNext();
    } else {
      setShowError(true)
    }
  };

  console.log(selectedColumnsList);


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

        <div className={styles.dropdownButtonContainer}>
          <DropDown 
            onColumnClick={(column) => {
              const index : number = selectedColumnsList.findIndex((obj : Column) => {return obj.originalName === column});
              const defaultIndex : number = selectedColumnsList.findIndex((newObj : Column) => {return newObj.originalName === defaultColumn});
              
              if (defaultIndex != -1){
                removeColumn({originalName: defaultColumn, displayName: selectedColumnsList[defaultIndex].displayName});
              }
              if (index == -1){
                addColumn({originalName: column, displayName: column});
              }
              setDefaultColumn(column);
              setShowError(false);
          } }

            columns={googleSheetColumns} 
            setDefaultColumn={setDefaultColumn} 
            defaultColumn={defaultColumn}
          />

          {showError && <div className={styles.errorMessage}>
            <Warning2 size="18" color="#FF0000"/>
            <p className={styles.errorText}>select a default column</p>
          </div>}
        </div>

        <i className={styles.subtitle}>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>

      <div className={styles.columnsContainer}>
        {googleSheetColumns.map((column) => 
          <ColumnSelectRow 
            key={column[0]}
            defaultColumn={defaultColumn}  
            originalName={column[0]} 
            isUnique={column[1]}
            
            customName={(originalName, newCustName) => {
              const index = selectedColumnsList.findIndex((obj : Column) => {
                return obj.originalName === originalName;
              }); 
              const tempSelectedColumnsList = selectedColumnsList;
              setSelectedColumnsList([...selectedColumnsList, ]);
              tempSelectedColumnsList[index].displayName = newCustName;
              setSelectedColumnsList(tempSelectedColumnsList);
              localStorage.setItem('selectedColumnsList', JSON.stringify(selectedColumnsList));
              console.log(selectedColumnsList);
            }} 

            onCheckChange={(originalName, newCheckedValue) => {
              if (newCheckedValue) {addColumn({originalName, displayName: originalName});}
              else{
                const index = selectedColumnsList.findIndex((obj : Column) => {return obj.originalName === originalName});
                removeColumn(selectedColumnsList[index]);
              }
              console.log(selectedColumnsList)
            }} 
            displayName={findDisplayName(column[0])}
            isDefaultColumn={(column : string | boolean) => column == defaultColumn} 
            isCheckedPersisted={isObjectChecked(column[0])}></ColumnSelectRow>)}
        </div>
      
      <Button
        buttonText="next"
        height="57px"
        onClick={handleOnNext}
        fontSize="14px"
        width="80px"
      />
      
    </div>
  );
};

export default ColumnSelector;
