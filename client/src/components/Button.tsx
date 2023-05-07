import styles from "./Button.module.css";
import { getTextColor, lightenColor } from "../utils/helpers";

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  iconSize?: string;
  borderRadius?: string;
  hoverColor?: string;
  onClick: () => void;
}

const Button = ({
  height,
  width,
  buttonText,
  margin,
  color,
  backgroundColor = "#087DF1",
  border = backgroundColor,
  disabled = false,
  fontSize = "1rem",
  fontWeight = "bold",
  icon,
  iconSize,
  borderRadius = "8px",
  hoverColor = "",
  onClick,
}: ButtonProps) => {
  if (hoverColor == "") hoverColor = lightenColor(backgroundColor, 20);
  return (
    <>
      <button
        className={styles.button}
        disabled={disabled}
        style={{
          height,
          width,
          margin,
          backgroundColor,
          border,
          color: color || getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          borderRadius: borderRadius,
          ["--hover-color" as any]: hoverColor,
        }}
        onClick={onClick}
      >
        <div
          className={icon ? styles.buttonContent : ""}
          style={{
            width: "80%",
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
