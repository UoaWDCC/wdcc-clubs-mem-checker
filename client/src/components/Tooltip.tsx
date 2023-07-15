import styles from "./Tooltip.module.css"

interface TooltipProps {
    backgroundColor: string;
    color: string;
    descBackgroundColor: string;
    descColor: string;
    infoDescription: string;
    width: string;
    triangleRight: string;
    descriptionLeft: string;
  }



const InfoToolTip = ({backgroundColor, color, infoDescription, descBackgroundColor, descColor, width, triangleRight, descriptionLeft}: TooltipProps) => {

    const styledDescription = {
        backgroundColor: descBackgroundColor,
        color: descColor,
        '--width' : width,
        '--desc-background-color': descBackgroundColor,
        '--triangle-right': triangleRight,
        '--description-left': descriptionLeft
      };

    return (
        <>
            <div className={styles.infoHover} style={{backgroundColor, color}}>i</div>
            <div className={ `${styles.dropdownInfo} ${styles.triangle}` } style={styledDescription}>{infoDescription}</div>
        </>
    )    
}

export default InfoToolTip;
