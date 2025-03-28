import styles from './style.module.css';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import { Warning2 } from 'iconsax-react';
import DropDown from '../../components/Dropdown';
import ColumnSelectRow from '../../components/ColumnSelectRow';
import { spreadsheetColumns } from './GoogleSheetForm';
import IColumn from '../../types/IColumn';

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];

  // const testColumns = {
  //   Awesome_A: { id: "A", name: "Awesome", unique: true },
  //   Bwesome_B: { id: "B", name: "Bwesome", unique: false },
  //   Cwesome_C: { id: "C", name: "Cwesome", unique: false },
  // };

  const [googleSheetColumns, setgoogleSheetColumns] = useState<
    Array<[string, boolean]>
  >(
    Object.entries(spreadsheetColumns).map(([key, value]: [any, any]) => [
      value.name,
      value.unique,
    ])
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
    console.log('updating selectedColumnsList');
    localStorage.setItem(
      'selectedColumnsList',
      JSON.stringify(selectedColumnsList)
    );
  }, [selectedColumnsList]);

  // Add column to selectedColumnsList
  const addColumn = (newColumn: IColumn) => {
    setSelectedColumnsList((prevList: IColumn[]) => {
      const updatedList = [...prevList, newColumn];
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Remove column from selectedColumnsList
  const removeColumn = (columnToRemove: IColumn) => {
    setSelectedColumnsList((prevList: IColumn[]) => {
      const updatedList = prevList.filter(
        (item) => item.originalName !== columnToRemove.originalName
      );
      localStorage.setItem('selectedColumnsList', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // Used to persist styles in ColumnSelectRow
  function isObjectChecked(name: string) {
    return selectedColumnsList.some(
      (obj: IColumn) => obj.originalName === name
    );
  }

  function findDisplayName(name: string) {
    const foundColumn = selectedColumnsList.find(
      (column: IColumn) => column.originalName === name
    );
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
      setPage({ ...page, identificationColumns: selectedColumnsList });
    } else {
      setShowError(true);
    }
  };

  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <BackButton
          onClick={onBack}
          color="#087DF1"
          size="45px"
          hoverColor="#cceeff"
          backgroundColor="transparent"
          margin="0 500px 0 0"
        />

<div>
        <div
          className={styles.title}
          style={{
            paddingBottom: '1.5em',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ width: '60%', fontSize: '2.3rem', lineHeight: '1.2' }}>
            select & edit columns
          </h1>
          <img src={GoogleSheetsLogo} />
        </div>

        <div
          className={styles.dropdownButtonContainer}
          style={{ paddingBottom: '2em' }}
        >
          <DropDown
            onColumnClick={(column) => {
              const index: number = selectedColumnsList.findIndex(
                (obj: IColumn) => {
                  return obj.originalName === column;
                }
              );
              const defaultIndex: number = selectedColumnsList.findIndex(
                (newObj: IColumn) => {
                  return newObj.originalName === defaultColumn;
                }
              );

              if (defaultIndex != -1) {
                removeColumn({
                  originalName: defaultColumn,
                  displayName: selectedColumnsList[defaultIndex].displayName,
                });
              }
              if (index == -1) {
                addColumn({ originalName: column, displayName: column });
              }
              setDefaultColumn(column);
              setShowError(false);
            }}
            columns={googleSheetColumns}
            setDefaultColumn={setDefaultColumn}
            defaultColumn={defaultColumn}
          />
          <br />
          {showError && (
            <div className={`${styles.errorMessage} `}>
              <Warning2
                size="18"
                color="#FF0000"
              />
              <p className={styles.errorText}>select a default column</p>
            </div>
          )}
        </div>

        <i className={styles.subtitle}>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>

      <div className={styles.columnsContainer}>
        {googleSheetColumns.map((column) => (
          <ColumnSelectRow
            key={column[0]}
            defaultColumn={defaultColumn}
            originalName={column[0]}
            isUnique={column[1]}
            customName={(originalName, newCustName) => {
              const index = selectedColumnsList.findIndex((obj: IColumn) => {
                return obj.originalName === originalName;
              });
              const tempSelectedColumnsList = selectedColumnsList;
              setSelectedColumnsList([...selectedColumnsList]);
              tempSelectedColumnsList[index].displayName = newCustName;
              setSelectedColumnsList(tempSelectedColumnsList);
              localStorage.setItem(
                'selectedColumnsList',
                JSON.stringify(selectedColumnsList)
              );
              console.log(selectedColumnsList);
            }}
            onCheckChange={(originalName, newCheckedValue) => {
              if (newCheckedValue) {
                addColumn({ originalName, displayName: originalName });
              } else {
                const index = selectedColumnsList.findIndex((obj: IColumn) => {
                  return obj.originalName === originalName;
                });
                removeColumn(selectedColumnsList[index]);
              }
              console.log(selectedColumnsList);
            }}
            displayName={findDisplayName(column[0])}
            isDefaultColumn={(column: string | boolean) =>
              column == defaultColumn
            }
            isCheckedPersisted={isObjectChecked(column[0])}
          ></ColumnSelectRow>
        ))}
      </div>

      <div className='text-center'>
        <Button
          buttonText="next"
          onClick={handleOnNext}
          fontSize="14px"
          width="80px"
          height="50px"
        />
      </div>

      </div>

    </div>
  );
};

export default ColumnSelector;
