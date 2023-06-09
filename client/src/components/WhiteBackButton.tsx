import WhiteBackArrow from "../assets/WhiteBackArrowBorder.svg";
import styles from "./WhiteBackButton.module.css";

interface WhiteBackButtonProps {
  onClick: () => void;
}

const WhiteBackButton = ({ onClick }: WhiteBackButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src={WhiteBackArrow} alt="back arrow" height="50px" />
    </button>
  );
};

export default WhiteBackButton;
