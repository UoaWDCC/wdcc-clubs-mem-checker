import { TickSquare, Edit, Warning2 } from "iconsax-react";
import { useState, useRef, useEffect } from "react";
import styles from "./ColumnSelectRow.module.css";


interface ColumnSelectRowProps {
    onCheckChange : (originalName: string, newCheckedValue : boolean) => void
    originalName : string
    customName : (originalName: string, newCustName : string) => void
    isDefaultColumn : boolean

}


const ColumnSelectRow = ({onCheckChange, originalName, isDefaultColumn, customName} : ColumnSelectRowProps) => {

    // const [isChecked, setIsChecked] = useState(() => {
    //     const storedColumn = localStorage.getItem('isChecked');
    //     console.log(storedColumn)
    //     return storedColumn !== null ? storedColumn : false;
    //   });
    

    const [isChecked, setIsChecked] = useState<boolean>(false);


    const [custName, setCustName] = useState<string>('');

    const ref = useRef(null);

    const setFocus = () => {
        ref.current.focus();
    }

    return <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-evenly', margin: '20px 0'}}>
        <div onClick={() => {
            if (!isDefaultColumn) {
                const newCheckedValue = !isChecked
                setIsChecked(newCheckedValue)
                onCheckChange(originalName, newCheckedValue)
                setCustName('')
            }

        }} className={styles.tickBox}>
            <div className={`${isChecked || isDefaultColumn? styles.tickSquareActive : styles.tickSquare}`}><TickSquare size="23" color="#848484"/></div>
        </div>
    

        <div className={ `${styles.editNameButton} ${isChecked || isDefaultColumn? styles.editNameButtonHover : ''}`} onClick={() => {isChecked || isDefaultColumn? setFocus() : null}}><Edit size="14" color="#aeaeae" /></div>

        <input value={custName} readOnly={!isDefaultColumn ? !isChecked : false} ref={ref} className={ `${styles.custNameInput} ${isChecked || isDefaultColumn? styles.custNameEditable : ''}` } type="text" placeholder={originalName} onChange={(event) => {
            const newCustName = event.target.value
            setCustName(newCustName)
            customName(originalName, newCustName)
            }}></input>

        <div className={ styles.duplicateFieldWarningIcon }><Warning2 size="18" color="#087DF1"/></div>
        <div className={ `${styles.duplicateFieldWarningDescription} ${ styles.speechTriangle }` }>Warning: This column contains duplicate values.</div>

    </div>
}

export default ColumnSelectRow;