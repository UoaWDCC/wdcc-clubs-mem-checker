import styles from "./style.module.css";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const ColumnSelector = ({ onNext, onBack }: ColumnSelectorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>select & edit columns</h1>
        <i>
          please select the google sheet columns you want to use as
          identification options
        </i>
      </div>
      <div className={styles.body}>image</div>
      <button id={styles.backButton} onClick={onBack}>
        Back
      </button>
      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default ColumnSelector;
