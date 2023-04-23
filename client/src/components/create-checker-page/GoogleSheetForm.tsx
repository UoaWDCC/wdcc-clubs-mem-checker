import styles from "./style.module.css";

interface GoogleSheetProps {
  onNext: () => void;
  onBack: () => void;
}

const GoogleSheetForm = ({ onNext, onBack }: GoogleSheetProps) => {
  return (
    <div className={styles.container}>
      <div>
        <h1>link your google sheet</h1>
        <i>
          paste the link to the google sheet with {`<club acronym>`}'s
          membershup data
        </i>
      </div>
      <div>
        <input type="text" placeholder="paste link here" />
      </div>
      <div>
        <p>
          If you have more than one google sheet (e.g. for different years), you
          can create more membership checker pages for your club later in the
          admin dashboard.
        </p>
      </div>
      <button id={styles.backButton} onClick={onBack}>
        Back
      </button>
      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default GoogleSheetForm;
