import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";

interface GoogleSheetProps {
  onNext: () => void;
}

const GoogleSheetForm = ({ onNext }: GoogleSheetProps) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>
          <h1>link your google sheet</h1>
          <img src={GoogleSheetsLogo} />
        </div>
        <i>
          paste the link to the google sheet with {`<club acronym>`}'s
          membership data
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
      <button id={styles.nextButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default GoogleSheetForm;
