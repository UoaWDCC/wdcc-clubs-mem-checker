import styles from "./Button.module.css";
import { getTextColor, lightenColor } from "../utils/helpers";

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  margin?: string;
  backgroundColor?: string;
  border?: string;
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
  border = backgroundColor,
  fontSize = "1rem",
  fontWeight = "bold",
  icon,
  iconSize,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        className={styles.button}
        style={{
          height,
          width,
          margin,
          backgroundColor,
          border,
          color: getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          ["--background-color" as any]: lightenColor(backgroundColor, 30),
        }}
        onClick={onClick}
      >
        <div
          className={icon ? styles.buttonContent : ""}
          style={{
            width: "70%",
            margin: "auto",
          }}
        >
          <img src={icon} height={iconSize} />
          {buttonText}
        </div>
      </button>
    </>
  );
};

export default Button;
