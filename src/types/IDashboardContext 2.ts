import IDashboardPage from "../../../api/routes/types/IDashboardPage";
import IDropdownClub from "./IDropdownClub";

export default interface IDashboardContext {
  dashboardPage?: IDashboardPage;
  selectedClub?: IDropdownClub;
  selectedPageIndex?: number; // stores the selected page id
}
