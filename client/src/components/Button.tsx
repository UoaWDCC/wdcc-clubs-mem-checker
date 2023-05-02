import styles from "./Button.module.css";
import { getTextColor, lightenColor } from "../utils/helpers";

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  margin?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  iconSize?: string;
  onClick: () => void;
}

const Button = ({
  height,
  width,
  buttonText,
  margin,
  backgroundColor = "#087DF1",
  fontSize = "1rem",
  fontWeight = "bold",
  icon,
  iconSize,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        className={icon ? styles.buttonWithIcon : styles.button}
        style={{
          height,
          width,
          margin,
          backgroundColor,
          border: backgroundColor,
          color: getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          ["--background-color" as any]: lightenColor(backgroundColor, 30),
        }}
        onClick={onClick}
      >
        <img src={icon} height={iconSize} />
        {buttonText}
      </button>
    </>
  );
};

export default Button;
