import { useEffect, useRef, useState } from "react";
import ColorPickerIcon from "../../../assets/ColorPickerIcon.svg";
import { ChromePicker, RGBColor } from "react-color";

interface ColorPickerItemProps {
  color: string;
  title: string;
  setColor: (color: string) => void;
}

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

const ColorPickerItem = ({ color, setColor, title }: ColorPickerItemProps) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [alpha, setAlpha] = useState<number>(100);
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (event: any) => {
    if (!refOne.current?.contains(event.target)) {
      setShowColorPicker(false);
    }
  };

  const handleOnClick = (event: any): void => {
    setShowColorPicker(!showColorPicker);
  };

  // function handleOnChange(color: ColorResult): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <>
      <div
        style={{
          borderBottom: "solid #4f4f4f55 2px",
          paddingBottom: "1vh",
          paddingTop: "0.5vh",
          width: "14vw",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
          }}
        >
          <img
            src={ColorPickerIcon}
            onClick={handleOnClick}
            height="100%"
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
            {title}
          </div>
        </div>
        <div
          style={{
            height: "20px",
            alignItems: "center",
            display: "flex",
            paddingLeft: "2vw",
            paddingTop: "0.5vh",
          }}
        >
          <div
            style={{
              height: "15px",
              width: "15px",
              float: "left",
              background: color,
            }}
          ></div>
          <div
            style={{
              color: "black",
              float: "left",
              fontSize: "10px",
              paddingLeft: "0.5vw",
              paddingRight: "1vw",
              width: "3vw",
            }}
          >
            {color ? color.substring(1, color.length - 2).toUpperCase() : ""}
          </div>
          <div
            style={{
              color: "black",
              float: "left",
              fontSize: "10px",
              paddingLeft: "0.5vw",
            }}
          >
            {Math.trunc(alpha) + "%"}
          </div>
        </div>
      </div>
      {showColorPicker ? (
        <div
          style={{
            position: "absolute",
            left: "21.5vw",
            top: "5vh",
          }}
          ref={refOne}
        >
          <ChromePicker
            color={color}
            onChange={(newColor) => {
              const newColorHex = rgbaToHex(newColor.rgb);
              setColor(newColorHex);
              setAlpha(newColor.rgb.a ? newColor.rgb.a * 100 : 100);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default ColorPickerItem;
