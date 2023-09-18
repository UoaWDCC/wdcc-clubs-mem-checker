import IColumn from './IColumn';

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
  logoLink?: string; // could change to string
  backgroundImageLink?: string; // could change to string
}
