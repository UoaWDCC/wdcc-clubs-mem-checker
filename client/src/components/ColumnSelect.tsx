import React, { useState, useRef, useEffect } from "react";
import styles from "./ColumnSelect.module.css"
import { Edit, TickSquare, Warning2 } from 'iconsax-react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import InfoToolTip from './Tooltip';

interface Column {
  key: String
  displayName: String
}

// const DropDown = ({ columns, onColumnClick, dropdownText, setDropdownText }: { columns: string[], onColumnClick: (option: string) => void, dropdownText: string, setDropdownText: Function}) => {
  
//   // const[isChecked, setIsChecked] = useState({})

//   // const handleChecked = (id :number) => {
//   //   setIsChecked((prevState) => ({
      
//   //     [id]: !prevState[id]

//   //   }));
//   // };

//   console.log(defaultOption);

//   return (
//     <>
    
//     {/* <div>
//       <div className={styles.buttonAndInfo}>
//         <button className={styles.dropdownButton} onClick={() => setIsExpanded(!isExpanded)}><i className = {styles.dropdownButtonText}>
//         select default column</i>
//           {isExpanded && <ArrowUp2 size="18" color="white"/>} 
//           {!isExpanded && <ArrowDown2 size="18" color="white"/>}
//         </button>
//         <InfoToolTip/>
//       </div>
      
//       {isExpanded &&
//       <div className={styles.dropdownContainer}>
//         <ul className={styles.dropdownList}>
//           <div>{columns.map( (column, i) => (
//             <div className={styles.dropdownRowContainer} onClick={() => {
//               setIsExpanded(false); 
//               onColumnClick(column); 
//               setDropdownText(column)
//               handleChecked(i)
//             }}>
//             <div className={` ${ isChecked[`${i}`] ? styles.dropdownClicked : styles.dropdownCheck}`}></div>
//             <li className={styles.dropdownListItem}><button id={ column } 
//                   className={styles.selectColumns} 
//                   >
//                     { column }
//                 </button>
//               </li>
//               </div>
//           ))}</div>
//         </ul>
//       </div>
//       }
//     </div> */}
//     </>
//   );
// };



function SelectColumns ( { columns, dropdownText } : { columns: string[], dropdownText: string } ) {
    const[isChecked, setIsChecked] = useState({});
    const[isEditing, setIsEditing] = useState({});
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selectedCols, setSelectedCols] = useState(new Map());
    const[newName, setNewName] = useState(new Map());
    const[isExpanded, setIsExpanded] = useState(false);
    const[defaultOption, setDefaultOption] = useState('')

    const selectedColumns : Column[] = []

    const selectDefaultOption = () => {

    }

    const editDisplayName = (key : String, displayName : String) => {

    }
    
    const setFocus = (i) => {
      if (!parentRef.current){
        return 
      }
      
      (parentRef.current!.querySelectorAll('input')[i] as HTMLInputElement).focus()
      setIsEditing((prevState) => ({
        ...isEditing,
        [i]: !prevState[i]
      }));

    };


    const checkedColumns = (column) => {
      const updatedSelectedCols = new Map(selectedCols);
      
      if (selectedCols.has(column)){
        updatedSelectedCols.delete(column);  
      }

      else {
        updatedSelectedCols.set(column, newName.has(column) ? newName.get(column) : column);  
      }

      setSelectedCols(updatedSelectedCols);
      console.log(selectedCols);
      
    }

    const newColumnName=(column, i) =>{
      var newColName = (parentRef.current!.querySelectorAll('input')[i] as HTMLInputElement).value;
      const updatedColName = new Map(newName);
      updatedColName.set(column, newColName); 
      setNewName(updatedColName);

      const updatedSelectedCols = new Map(selectedCols);
      updatedSelectedCols.set(column, newName.has(column) ? newName.get(column) : column); 
      setSelectedCols(updatedSelectedCols);
      
    }
      
    
    const handleColumnClick = (id, column) => {
      
      setIsChecked((prevState) => ({
        ...isChecked,
        [id]: !prevState[id]
      }));
      
      checkedColumns(column);

    };

    


    return (
      <>
      <select value={defaultOption} onChange={(event) => setDefaultOption(event.target.value)}>
      <option value="" disabled hidden>
        select default option
      </option>
      {columns.map((option) => <option key={option} value={option}>{option}</option>) }
     </select>

     <i className={styles.pickColumnsDescription}>
          please select the google sheet columns you want to use as
          identification options
        </i>

      <div className={styles.columnContainer}>
      <div ref={parentRef}> {columns.map( (column, i) => (
      <div key={ column } className = { `${styles.columnContainer} ${ isChecked[`${i}`] ? styles.editable : '' } ${ dropdownText == column ? styles.editable : '' }` }>
        <span className={ `${ styles.checkbox } ${ isChecked[`${i}`] ? styles.checkboxActive : ''} ${ dropdownText == column ? styles.checkboxActive : ''}`} onClick={() => handleColumnClick(i, column)}>
        <div className={ `${ isChecked[`${i}`] || dropdownText == column ? styles.tickActive : styles.tickNotActive} `}><TickSquare size="23" color="#848484"/></div>
        </span>
        <div className={ `${styles.editColumn} ${ isChecked[`${i}`] ? styles.editColumnButton : ''}`} onClick={() => {isChecked[`${i}`] || dropdownText == column ? setFocus(i) : null }} ><Edit size="14" color="#aeaeae" /></div>
        <input className={ `${ styles.editName } ${ isEditing[`${i}`] && isChecked[`${i}`] ? styles.editing : ''}` } type="text" placeholder={ column }  name="customName" onChange={() => newColumnName(column, i)}></input>
        <div className={styles.infoHover}><Warning2 size="18" color="#087DF1"/></div>
        <div className={ `${styles.dropdownInfo} ${styles.triangle}`}>Warning: This column contains duplicate values.</div>
      </div>
      ))}
      </div>
      </div>

      </>
    );
};
  
  export default SelectColumns;
