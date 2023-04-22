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
