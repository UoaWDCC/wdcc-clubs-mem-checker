import Column from "./Column";

export default interface Page {
    googleSheetLink?: string;
    identificationColumns?: Column[];
    title?: string;
    font?: string;
    backgroundColor?: string;
    titleTextColor?: string;
    textFieldBackgroundColor?: string;
    textFieldtextColor?: string;
    buttonColor?: string;
    dropDownBackgroundColor?: string;
    logoLink?: File;
    backgroundImageLink?: File;
}