import React, { useState } from 'react';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import InfoToolTip from './Tooltip';
import styles from './Dropdown.module.css';

const DropDown = ({
  columns,
  onColumnClick,
  defaultColumn,
  setDefaultColumn,
}: {
  columns: (string | boolean)[][];
  onColumnClick: (option: string) => void;
  defaultColumn: string;
  setDefaultColumn: Function;
}) => {
  const [isExpanded, setIsExpanded] = useState<any>(false);
  // const[defaultOption, setDefaultOption] = useState('')
  const [isChecked, setIsChecked] = useState<any>({});

  const handleChecked = (id: number) => {
    setIsChecked((prevState: any[]) => ({
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <div>
        <div className={styles.buttonAndInfo}>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className={styles.dropdownButtonText}>select a default column*</i>
            {isExpanded && (
              <ArrowUp2
                size="18"
                color="white"
              />
            )}
            {!isExpanded && (
              <ArrowDown2
                size="18"
                color="white"
              />
            )}
          </button>
          <InfoToolTip
            descriptionLeft="60%"
            triangleRight="150px"
            width="160px"
            backgroundColor="#E0E0E0"
            color="#087DF1"
            infoDescription="This will be the default identification option displayed to users. Users can then select another option if they wish to do so."
            descBackgroundColor="#E0E0E0"
            descColor="#087DF1"
          />
        </div>

        {isExpanded && (
          <div className={styles.dropdownContainer}>
            <ul className={styles.dropdownList}>
              <div>
                {columns.map((column: any, i: any) => (
                  <div
                    className={styles.dropdownRowContainer}
                    onClick={() => {
                      setIsExpanded(false);
                      onColumnClick(column[0]);
                      setDefaultColumn(column[0]);
                      handleChecked(i);
                    }}
                    key={column[0]}
                  >
                    <div
                      className={` ${
                        isChecked[`${i}`] || defaultColumn == column[0]
                          ? styles.dropdownClicked
                          : styles.dropdownCheck
                      }`}
                    ></div>
                    <li className={styles.dropdownListItem}>
                      <button className={styles.selectColumns}>
                        {column[0]}
                      </button>
                    </li>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
