import BackArrow from "../assets/bluebacksquare.svg";
import styles from "./WhiteBackButton.module.css";

interface BackArrow {
  onClick: () => void;
}

const BlueBackArrow = ({ onClick }: BackArrow) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src={BackArrow} alt="back arrow" height="40vh" />
    </button>
  );
};

export default BlueBackArrow;
