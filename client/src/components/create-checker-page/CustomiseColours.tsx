import styles from "./style.module.css";
import BackArrow from "../../assets/BackArrow.svg";

interface CustomiseColoursProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseColours = ({ onNext, onBack }: CustomiseColoursProps) => {
  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <button id={styles.CustomisePageBackButton} onClick={onBack}>
          <img src={BackArrow} />
        </button>
        <div>
          <h2>customise page</h2>
          <i>customise page for your members</i>
        </div>
        <div>
          <p>choose your theme colours</p>
        </div>
        <button id={styles.CustomisePageNextButton} onClick={onNext}>
          next
        </button>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseColours;
