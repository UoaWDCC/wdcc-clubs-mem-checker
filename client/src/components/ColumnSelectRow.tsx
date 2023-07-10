import { TickSquare, Edit, Warning2 } from "iconsax-react";
import { useState, useRef } from "react";
import styles from "./ColumnSelectRow.module.css";


interface ColumnSelectRowProps {
    onCheckChange : (originalName: string, newCheckedValue : boolean) => void
    originalName : string
    customName : (originalName: string, newCustName : string) => void
}


const ColumnSelectRow = ({onCheckChange, originalName, customName} : ColumnSelectRowProps) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [custName, setCustName] = useState<string>();
    const ref = useRef(null);

    const setFocus = () => {
        ref.current.focus();
    }

    return <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-evenly'}}>
        <div onClick={() => {
            const newCheckedValue = !isChecked
            setIsChecked(newCheckedValue)
            onCheckChange(originalName, newCheckedValue)
            
        }} className={styles.tickBox}>
            <div className={`${isChecked ? styles.tickSquareActive : styles.tickSquare}`}><TickSquare size="23" color="#848484"/></div>
        </div>
    

        <div className={ styles.editNameButton } onClick={() => setFocus()}><Edit size="14" color="#aeaeae" /></div>

        <input ref={ref} className={ styles.custNameInput } type="text" placeholder={ 'column' } onChange={(event) => {
            const newCustName = event.target.value
            setCustName(newCustName)
            customName(originalName, newCustName)
            }}></input>

        <div className={ styles.duplicateFieldWarningIcon }><Warning2 size="18" color="#087DF1"/></div>
        <div className={ `${styles.duplicateFieldWarningDescription} ${ styles.speechTriangle }` }>Warning: This column contains duplicate values.</div>

    </div>
}

export default ColumnSelectRow;