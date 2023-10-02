import styles from "./Button.module.css";
import { getTextColor, lightenColor } from "../utils/helpers";
import { CircularProgress } from "@mui/material";

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  iconSize?: string;
  borderRadius?: string;
  hoverColor?: string;
  padding?: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  height,
  width,
  buttonText,
  margin,
  color,
  backgroundColor = "#087DF1",
  border = backgroundColor,
  fontSize = "1rem",
  fontWeight = "bold",
  icon,
  iconSize,
  borderRadius = "8px",
  hoverColor = "",
  padding = "5px",
  disabled,
  onClick,
  isLoading,
}: ButtonProps) => {
  if (hoverColor == "") hoverColor = lightenColor(backgroundColor, 20);
  if (disabled) hoverColor = backgroundColor;
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
          color: color || getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          borderRadius: borderRadius,
          padding: padding,
          ["--hover-color" as any]: hoverColor,
          pointerEvents: disabled ? "none" : "auto",
        }}
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={icon ? styles.buttonContent : ""}
          style={{
            width: "80%",
            margin: "auto",
            overflow: "clip",
          }}
        >
          {isLoading ? (
            <div className={styles.circular_progress}>
              <CircularProgress sx={{ color: "white" }} size="1.5rem" />
            </div>
          ) : (
            <>
              {icon && <img src={icon} height={iconSize} />}
              {buttonText}
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
