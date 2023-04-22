import styles from "./Button.module.css";

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  onClick: () => void;
}

const getTextColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#4F4F4F" : "#ffffff";
};

const Button = ({
  height,
  width = "10rem",
  buttonText,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundColor = "#087DF1",
  fontSize = "1rem",
  fontWeight = "bold",
  onClick,
}: ButtonProps) => {
  return (
    <div className={styles.container}>
      <button
        style={{
          height,
          width,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          backgroundColor,
          border: backgroundColor,
          borderRadius: "10px",
          padding: "10px",
          color: getTextColor(backgroundColor),
          fontFamily: "Montserrat",
          fontSize,
          fontWeight,
        }}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
