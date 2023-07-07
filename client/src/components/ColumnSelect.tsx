import React, { useState, useRef, useEffect } from "react";
import styles from "./ColumnSelect.module.css"
import { Edit, TickSquare, Warning2 } from 'iconsax-react';


function SelectColumns ( { columns, dropdownText } : { columns: string[], dropdownText: string } ) {
    const[isChecked, setIsChecked] = useState({});
    const[isEditing, setIsEditing] = useState({});
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selectedCols, setSelectedCols] = useState(new Map());
    const[newName, setNewName] = useState(new Map());
    
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

      </>
    );
};
  
  export default SelectColumns;
