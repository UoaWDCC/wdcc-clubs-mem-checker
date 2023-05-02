import { getTextColor, lightenColor } from "../utils/helpers";
import styles from "./Textfield.module.css";
import { forwardRef } from "react";

interface TextfieldProps {
  height?: string;
  width?: string;
  margin?: string;
  backgroundColor?: string;
  textColour?: string;
  fontSize?: string;
  fontWeight?: string;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  icon?: string;
  iconSize?: string;
  onKeyUp?: () => void;
  onChange?: () => void;
}

const Textfield = forwardRef(
  (
    {
      height,
      width = "12rem",
      margin,
      backgroundColor = "#e0e0e0",
      textColour,
      fontSize,
      fontWeight,
      placeholder,
      label,
      isError,
      icon,
      iconSize = "1rem",
      onKeyUp,
      onChange,
    }: TextfieldProps,
    ref: any
  ) => {
    const iconStyles = icon
      ? {
          backgroundImage: `url(${icon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: iconSize,
          backgroundPosition: "10px",
          paddingLeft: icon ? `calc(${iconSize} + 1rem)` : "1rem",
        }
      : {};
    textColour = textColour ? textColour : getTextColor(backgroundColor);

    return (
      <div style={{ margin }}>
        <label>{label}</label>
        <input
          ref={ref}
          onKeyUp={onKeyUp}
          className={styles.input}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            height,
            width,
            backgroundColor,
            color: textColour,
            fontSize,
            fontWeight,
            border: isError ? "1px solid red" : backgroundColor,
            ["--focus-border-color" as any]: lightenColor(backgroundColor, -75),
            ["--placeholder-color" as any]: getTextColor(backgroundColor),
            ...iconStyles,
          }}
        />
      </div>
    );
  }
);

export default Textfield;
