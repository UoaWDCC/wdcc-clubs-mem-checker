import { getTextColour } from "../utils/helpers";

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
}

//reusable textfield component
const Textfield = ({
  height,
  width,
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
}: TextfieldProps) => {
  isError = false;
  if (isError) {
    border = '#800000';
    errorText = "Please fill out this field"
    } 
    else {
    border = backgroundColor;
    errorText = ""
    }
  return (
    <div>
      <label>{label}</label>
      <input
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
          color: getTextColour(backgroundColor),
          fontFamily: "Montserrat",
          fontSize,
          fontWeight,
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textfield;
