import ColorPickerItem from "./ColorPickerItem";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider } from "../CreateCheckerPage";
import IPage from "../../../types/IPage";
import ICreateCheckerPageContext from "../../../types/ICreateCheckerPageContext";

export const ColorPicker = () => {
  const [context, setContext] = useContext(PageContextProvider) as [
    ICreateCheckerPageContext,
    Dispatch<SetStateAction<ICreateCheckerPageContext>>
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          background: "#E0E0E0",
          borderRadius: "10px",
          color: "#707070",
          fontStyle: "italic",
          fontSize: "1.5vh",
          width: "13vw",
          height: "3vh",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          margin: "1vh 0vh",
        }}
      >
        choose your theme colours
      </div>
      <ColorPickerItem
        color={
          context.page.backgroundColor
            ? context.page.backgroundColor
            : "#ECECECEE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, backgroundColor: color },
          });
        }}
        title="background color"
      />
      <ColorPickerItem
        color={
          context.page.titleTextColor
            ? context.page.titleTextColor
            : "#000000EE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, titleTextColor: color },
          });
        }}
        title="title text colour"
      />
      <ColorPickerItem
        color={
          context.page.textFieldBackgroundColor
            ? context.page.textFieldBackgroundColor
            : "#E0E0E0EE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, textFieldBackgroundColor: color },
          });
        }}
        title="text field background colour"
      />
      <ColorPickerItem
        color={
          context.page.textFieldtextColor
            ? context.page.textFieldtextColor
            : "#000000EE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, textFieldBackgroundColor: color },
          });
        }}
        title="text field text colour"
      />
      <ColorPickerItem
        color={
          context.page.dropDownBackgroundColor
            ? context.page.dropDownBackgroundColor
            : "#4F4F4FEE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, dropDownBackgroundColor: color },
          });
        }}
        title="dropdown background colour"
      />
      <ColorPickerItem
        color={
          context.page.buttonColor ? context.page.buttonColor : "#4F4F4FEE"
        }
        setColor={(color: string) => {
          setContext({
            ...context,
            page: { ...context.page, buttonColor: color },
          });
        }}
        title="button colour"
      />
    </>
  );
};
