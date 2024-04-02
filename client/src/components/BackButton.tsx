import styles from "./Button.module.css";
import { BackSquare, Calculator, Translate } from "iconsax-react";
import { getTextColor, lightenColor } from "../utils/helpers";

export interface ButtonProps {
  size?: string;
  margin?: string;
  backgroundColor?: string;
  border?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  iconSize?: string;
  borderRadius?: string;
  hoverColor?: string;
  padding?: string;
  onClick: () => void;
}

const BackButton = ({
  size = "40px",
  margin,
  backgroundColor = "#087DF1",
  border = backgroundColor,
  color,
  fontSize = "1rem",
  fontWeight = "bold",
  borderRadius = "20%",
  hoverColor = "",
  onClick,
}: ButtonProps) => {
  if (hoverColor == "") hoverColor = lightenColor(backgroundColor, 20);
  return (
    <>
      <button
        className={styles.button}
        style={{
          height: size,
          width: size,
          margin,
          backgroundColor,
          border,
          fontSize,
          fontWeight,
          borderRadius: borderRadius,
          ["--hover-color" as any]: hoverColor,
        }}
        onClick={onClick}
      >
        <div
          style={{height: "100%", width: "100%", margin: "auto", transform: "translate(-10%, -10%)"}}
        >
          <BackSquare size={parseInt(size, 10)*1.2} color={color}/>
        </div>
      </button>
    </>
  );
};

export default BackButton;
