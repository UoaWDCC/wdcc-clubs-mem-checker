import styles from "./Background.module.css";
import WdccLogo from "../assets/WdccLogo.svg";

interface BackgroundProps {
  children?: React.ReactNode;
}
const Background = ({ children }: BackgroundProps) => {
  return (
    <div className={styles.background}>
      <img id={styles.wdccLogo} src={WdccLogo} />
      {children}
    </div>
  );
};

export default Background;
