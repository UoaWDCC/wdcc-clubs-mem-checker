import React, { useState, useRef, useEffect } from "react";
import styles from "./ColumnSelect.module.css"
import { Edit } from 'iconsax-react';


function SelectColumns ( { columns, dropdownText } : { columns: string[], dropdownText: string } ) {
    const[isChecked, setIsChecked] = useState({});
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selectedCols, setSelectedCols] = useState(new Map());
    
    const setFocus = (i) => {
      if (!parentRef.current){
        return 
      }
      (parentRef.current!.querySelectorAll('input')[i] as HTMLInputElement).focus()
    };


    const checkedColumns = (column, input) => {
      const updatedSelectedCols = new Map(selectedCols);
      
      if (selectedCols.has(column)){
        updatedSelectedCols.delete(column);  
      }

      else {
        updatedSelectedCols.set(column, input ? input : column);  
      }

      setSelectedCols(updatedSelectedCols);
      console.log(selectedCols);
      
    }
      
    
    const handleColumnClick = (id, column) => {
      
      setIsChecked((prevState) => ({
        ...isChecked,
        [id]: !prevState[id]
      }));
      const input = null;
      checkedColumns(column, input)

    };

    


    return (
      <>
      <div ref={parentRef}> {columns.map( (column, i) => (
      <div key={ column } className = { `${styles.columnContainer} ${ isChecked[`${i}`] ? styles.editable : '' } ${ dropdownText == column ? styles.editable : '' }` }>
        <span className={ `${ styles.checkbox } ${ isChecked[`${i}`] ? styles.checkboxActive : ''} ${ dropdownText == column ? styles.checkboxActive : ''}`} onClick={() => handleColumnClick(i, column)}/>
        <input className={ styles.editName } type="text" placeholder={ column }  name="customName"></input>
        <div className={ isChecked[`${i}`] ? styles.editColumnButton : ''} onClick={() => {isChecked[`${i}`] ? setFocus(i) : null }} ><Edit size="18" color="#aeaeae" /></div>
      </div>
      ))}
      </div>

      </>
    );
};
  
  export default SelectColumns;
