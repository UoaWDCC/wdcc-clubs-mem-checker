import styles from "./Tooltip.module.css"

interface TooltipProps {
    backgroundColor: string;
    color: string;
    descBackgroundColor: string;
    descColor: string;
    infoDescription: string;
  }



const InfoToolTip = ({backgroundColor, color, infoDescription, descBackgroundColor, descColor}: TooltipProps) => {

    const styledDescription = {
        backgroundColor: descBackgroundColor,
        color: descColor,
        '--desc-background-color': descBackgroundColor
      };

    return (
        <>
            <div className={styles.infoHover} style={{backgroundColor, color}}>i</div>
            <div className={ `${styles.dropdownInfo} ${styles.triangle}`} style={styledDescription}>{infoDescription}</div>
        </>
    )    
}

export default InfoToolTip;
