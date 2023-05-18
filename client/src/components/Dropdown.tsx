import React, { useState } from "react";
import styles from "./Dropdown.module.css"
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

const DropDown = ({ columns, onColumnClick }: { columns: string[], onColumnClick: (option: string) => void }) => {
  const[isExpanded, setIsExpanded] = useState(false);
  const[dropdownText, setDropdownText] = useState('select default column')


  return (
    <>
    <div>
      <button className={styles.dropdownButton} onClick={() => setIsExpanded(!isExpanded)}>
      {dropdownText}
      {isExpanded && <ArrowUp2 size="18" color="white"/>} 
      {!isExpanded && <ArrowDown2 size="18" color="white"/>}
    
      </button>
      {isExpanded &&
        <ul className={styles.dropdownList}>
          <div className="">{columns.map(column => (
            <li><button id={ column } 
                  className={styles.selectColumns} 
                  onClick={() => {
                    setIsExpanded(false); 
                    onColumnClick(column); 
                    setDropdownText(column)
                  }}>
                    { column }
                </button>
              </li>
          ))}</div>
        </ul>
      }
    </div>
    </>
  );
};

export default DropDown;

