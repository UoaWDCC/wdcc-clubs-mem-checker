import { getTextColour } from "../utils/helpers";
import styles from "./Textfield.module.css";
import React, { ForwardedRef, forwardRef } from "react";

interface TextfieldProps {
  height?: string;
  width?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  placeholder?: string;
  label?: string;
  border?: string;
  errorText?: string;
  isError?: boolean;
  onKeyUp?: () => void;
  onChange?: () => void;
}

//reusable textfield component
const Textfield = forwardRef(
  (
    {
      height,
      width = "12rem",
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      backgroundColor = "#e0e0e0",
      fontSize,
      fontWeight,
      placeholder,
      label,
      border,
      errorText,
      isError,
      onKeyUp,
      onChange,
    }: TextfieldProps,
    ref: any
  ) => {
    if (isError) {
      placeholder = "Please fill out this field";
      backgroundColor = "#FFCDD2";
    }
    return (
      <div>
        <label>{label}</label>
        <input
          ref={ref}
          onKeyUp={onKeyUp}
          className={isError ? styles.inputError : styles.input}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            height,
            width,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            backgroundColor,
            color: getTextColour(backgroundColor),
            fontFamily: "Montserrat",
            fontSize,
            fontWeight,
          }}
        />
      </div>
    );
  }
);

export default Textfield;
