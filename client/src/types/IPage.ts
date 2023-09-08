import IColumn from "./IColumn";

export default interface IPage {
  id?: number;
  googleSheetLink?: string;
  identificationColumns?: IColumn[];
  title?: string;
  font?: string;
  backgroundColor?: string;
  titleTextColor?: string;
  textFieldBackgroundColor?: string;
  textFieldtextColor?: string;
  buttonColor?: string;
  dropDownBackgroundColor?: string;
  logoLink?: File; // could change to string
  backgroundImageLink?: File; // could change to string
}
