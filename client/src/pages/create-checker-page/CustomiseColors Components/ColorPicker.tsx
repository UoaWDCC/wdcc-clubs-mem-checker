import { ChromePicker } from "react-color";
import ColorPickerItem from "./ColorPickerItem";

export const ColorPicker = () => {
  return (
    <>
      <div
        style={{
          background: "#E0E0E0",
          borderRadius: "10px",
          color: "black",
          fontStyle: "italic",
          fontSize: "0.9rem",
        }}
      >
        choose your theme colours
      </div>
      <ColorPickerItem />
    </>
  );
};
