import IDashboardPage from './IDashboardPage';
import IDropdownClub from '../client/src/types/IDropdownClub';

export default interface IDashboardContext {
  dashboardPage?: IDashboardPage;
  selectedClub?: IDropdownClub;
  selectedPageIndex?: number; // stores the selected page id
}
