import styles from "./style.module.css";

interface CustomisePageProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomisePage = ({ onNext, onBack }: CustomisePageProps) => {
  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div>
          <h2>customise page</h2>
          <i>customise page for your members</i>
        </div>
        <div>
          <p>some fields</p>
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>

      <button id={styles.backButton} onClick={onBack}>
        Back
      </button>
      <button id={styles.nextButton} onClick={onNext}>
        Confirm
      </button>
    </div>
  );
};

export default CustomisePage;
