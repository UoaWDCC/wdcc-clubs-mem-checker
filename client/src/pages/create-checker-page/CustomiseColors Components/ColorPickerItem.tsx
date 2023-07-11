import { Dispatch, SetStateAction, useContext, useState } from "react";
import ColorPickerIcon from "../../../assets/ColorPickerIcon.svg";
import { Page, PageContextProvider } from "../CreateCheckerPage";
import { ChromePicker, ColorResult, RGBColor, SketchPicker } from "react-color";

interface ColorPickerItemProps {}

const rgbaToHex = (rgba: RGBColor): string => {
  const { r, g, b, a } = rgba;
  const alpha = a
    ? Math.round(a * 255)
        .toString(16)
        .padStart(2, "0")
    : "";
  const red = r.toString(16).padStart(2, "0");
  const green = g.toString(16).padStart(2, "0");
  const blue = b.toString(16).padStart(2, "0");

  return `#${red}${green}${blue}${alpha}`;
};

const ColorPickerItem = (props: ColorPickerItemProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const [color, setColor] = useState<string>("#E0E0E0");

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  // TODO - add type to event
  function handleOnClick(event: any): void {
    setShowColorPicker(!showColorPicker);
  }

  const test = "#E0E0E0";

  function handleOnChange(color: ColorResult): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div>
        <div
          style={{
            height: "20px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
          }}
        >
          <img
            src={ColorPickerIcon}
            onClick={handleOnClick}
            height="15vh"
            style={{ cursor: "pointer", float: "left" }}
          ></img>
          <div
            style={{
              color: "#AAAAAA",
              fontSize: "0.7rem",
              float: "left",
              marginLeft: "10px",
            }}
          >
            background color
          </div>
        </div>
        <div
          style={{
            height: "20px",
            alignItems: "center",
            display: "flex",
            paddingLeft: "10px",
          }}
        >
          <div
            style={{
              height: "15px",
              width: "15px",
              float: "left",
              background: page.backgroundColor,
            }}
          ></div>
          <div style={{ color: "black", float: "left", fontSize: "10px" }}>
            {page.backgroundColor}
          </div>
        </div>
      </div>
      {showColorPicker ? (
        <div
          style={{
            position: "absolute",
            left: "25vw",
            top: "10vh",
          }}
        >
          <ChromePicker
            color={page.backgroundColor}
            onChange={(newColor) => {
              const newColorHex = rgbaToHex(newColor.rgb);
              setPage({ ...page, backgroundColor: newColorHex });
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default ColorPickerItem;
