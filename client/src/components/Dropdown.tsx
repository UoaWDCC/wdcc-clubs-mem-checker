import React, { useState } from "react";
import styles from "./Dropdown.module.css"
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

const DropDown = ({ columns, onColumnClick, dropdownText, setDropdownText }: { columns: string[], onColumnClick: (option: string) => void, dropdownText: string, setDropdownText: Function}) => {
  const[isExpanded, setIsExpanded] = useState(false);
  const[isChecked, setIsChecked] = useState({})

  const handleChecked = (id) => {
    setIsChecked((prevState) => ({
      
      [id]: !prevState[id]

    }));
  };


  return (
    <>
    <div>
      <div className={styles.buttonAndInfo}>
        <button className={styles.dropdownButton} onClick={() => setIsExpanded(!isExpanded)}>
          {dropdownText}
          {isExpanded && <ArrowUp2 size="18" color="white"/>} 
          {!isExpanded && <ArrowDown2 size="18" color="white"/>}
        </button>
        <div className={styles.infoHover}>i</div>
        <div className={ `${styles.dropdownInfo} ${styles.triangle}`}>Select which columns user will see first.</div>
      </div>
      
      {isExpanded &&
      <div className={styles.dropdownContainer}>
        <ul className={styles.dropdownList}>
          <div>{columns.map( (column, i) => (
            <div className={styles.dropdownRowContainer} onClick={() => {
              setIsExpanded(false); 
              onColumnClick(column); 
              setDropdownText(column)
              handleChecked(i)
            }}>
            <div className={` ${ isChecked[`${i}`] ? styles.dropdownClicked : styles.dropdownCheck}`}></div>
            <li className={styles.dropdownListItem}><button id={ column } 
                  className={styles.selectColumns} 
                  >
                    { column }
                </button>
              </li>
              </div>
          ))}</div>
        </ul>
      </div>
      }
    </div>
    </>
  );
};

export default DropDown;

