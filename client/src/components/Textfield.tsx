import { getTextColor } from "./Button";

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
}: TextfieldProps) => {
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
          color: getTextColor(backgroundColor),
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
