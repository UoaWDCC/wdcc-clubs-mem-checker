import { TickSquare, Edit, Warning2 } from "iconsax-react";
import { useState, useRef, useEffect } from "react";
import styles from "./ColumnSelectRow.module.css";

interface ColumnSelectRowProps {
  onCheckChange: (originalName: string, newCheckedValue: boolean) => void;
  originalName: string;
  customName: (originalName: string, newCustName: string) => void;
  displayName: string;
  isDefaultColumn: (column: string) => boolean;
  defaultColumn: string;
  isCheckedPersisted: boolean;
  isUnique: string | boolean;
}

const ColumnSelectRow = ({
  onCheckChange,
  originalName,
  defaultColumn,
  isDefaultColumn,
  customName,
  isCheckedPersisted,
  isUnique,
  displayName,
}: ColumnSelectRowProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    isDefaultColumn(originalName) || isCheckedPersisted
  );

  useEffect(() => {
    setIsChecked(isDefaultColumn(originalName) || isCheckedPersisted);
  }, [defaultColumn]);

  const [custName, setCustName] = useState<string>(
    isChecked ? displayName : ""
  );

  useEffect(() => {
    setCustName(isChecked ? displayName : "");
  }, []);

  // Save the input value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("inputValue", custName);
  }, [custName]);

  const inputRef = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "20px 0",
      }}
    >
      <div
        onClick={() => {
          if (!isDefaultColumn(originalName)) {
            const newCheckedValue = !isChecked;
            setIsChecked(newCheckedValue);
            onCheckChange(originalName, newCheckedValue);
            setCustName("");
          }
        }}
        className={styles.tickBox}
      >
        <div
          className={`${
            isChecked ? styles.tickSquareActive : styles.tickSquare
          }`}
        >
          <TickSquare size="23" color="#848484" />
        </div>
      </div>

      <div
        className={`${styles.editNameButton} ${
          isChecked ? styles.editNameButtonHover : ""
        }`}
        onClick={() => {
          isChecked ? setFocus() : null;
        }}
      >
        <Edit size="14" color="#aeaeae" />
      </div>

      <input
        value={isChecked ? custName : originalName}
        readOnly={!isChecked}
        ref={inputRef}
        className={`${styles.custNameInput} ${
          isChecked ? styles.custNameEditable : ""
        }`}
        type="text"
        placeholder={originalName}
        onChange={(event) => {
          const newCustName = event.target.value;
          setCustName(newCustName);
          customName(originalName, newCustName);
        }}
        name="input"
      ></input>

      <div
        className={`${styles.duplicateFieldWarningIcon} ${
          isUnique ? styles.warningHidden : ""
        }`}
      >
        <Warning2 size="18" color="#087DF1" />
      </div>
      <div
        className={`${styles.duplicateFieldWarningDescription} ${styles.speechTriangle}`}
      >
        Warning: This column contains duplicate values.
      </div>
    </div>
  );
};

export default ColumnSelectRow;
