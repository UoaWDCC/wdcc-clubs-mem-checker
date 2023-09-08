export default interface IPageCustomization {
  name: string;
  organisationId: string;
  sheetId: string;
  sheetTabId: string;
  backgroundColor?: string;
  textFieldBackgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  headingColor?: string;
  logoLink?: string;
  backgroundImageLink?: string;
  fontFamily?: string;
  columns: {
    originalName: string;
    mappedTo?: string;
  }[];
}
