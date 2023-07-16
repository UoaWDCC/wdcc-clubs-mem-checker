import ColorPickerItem from "./ColorPickerItem";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "../CreateCheckerPage";

export const ColorPicker = () => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          background: "#E0E0E0",
          borderRadius: "10px",
          color: "black",
          fontStyle: "italic",
          fontSize: "0.9rem",
          width: "11vw",
          height: "3vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        choose your theme colours
      </div>
      <ColorPickerItem
        color={page.backgroundColor ? page.backgroundColor : "#ECECECEE"}
        setColor={(color: string) => {
          setPage({ ...page, backgroundColor: color });
        }}
        title="background color"
      />
      <ColorPickerItem
        color={page.titleTextColor ? page.titleTextColor : "#000000EE"}
        setColor={(color: string) => {
          setPage({ ...page, titleTextColor: color });
        }}
        title="title text colour"
      />
      <ColorPickerItem
        color={
          page.textFieldBackgroundColor
            ? page.textFieldBackgroundColor
            : "#E0E0E0EE"
        }
        setColor={(color: string) => {
          setPage({ ...page, textFieldBackgroundColor: color });
        }}
        title="text field background colour"
      />
      <ColorPickerItem
        color={page.textFieldtextColor ? page.textFieldtextColor : "#000000EE"}
        setColor={(color: string) => {
          setPage({ ...page, textFieldtextColor: color });
        }}
        title="text field text colour"
      />
      <ColorPickerItem
        color={
          page.dropDownBackgroundColor
            ? page.dropDownBackgroundColor
            : "#4F4F4FEE"
        }
        setColor={(color: string) => {
          setPage({ ...page, dropDownBackgroundColor: color });
        }}
        title="dropdown background colour"
      />
    </>
  );
};
