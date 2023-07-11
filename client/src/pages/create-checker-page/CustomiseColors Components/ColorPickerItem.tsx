import { Dispatch, SetStateAction, useContext, useState } from "react";
import ColorPickerIcon from "../../../assets/ColorPickerIcon.svg";
import { Page, PageContextProvider } from "../CreateCheckerPage";
import { ChromePicker } from "react-color";

interface ColorPickerItemProps {}

const ColorPickerItem = (props: ColorPickerItemProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  // TODO - add type to event
  function handleOnClick(event: any): void {
    setShowColorPicker(!showColorPicker);
  }

  const test = "#E0E0E0";

  return (
    <>
      <div style={{ background: "red" }}>
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
            background: "yellow",
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
              background: page.backgroundColor ? page.backgroundColor : test,
            }}
          ></div>
          <div style={{ color: "black", float: "left", fontSize: "10px" }}>
            {page.backgroundColor ? page.backgroundColor : test}
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
          <ChromePicker />
        </div>
      ) : null}
    </>
  );
};

export default ColorPickerItem;
