import styles from "./style.module.css";
import WDCCLogoBlue from "../../assets/wdcc_blue_logo.svg";
import React, { useState } from "react";
import SelectClubDropdown, {
  DropdownClub,
} from "./components/SelectClubDropdown";

export interface Dashboard {
  checkerPage?: string;
  selectedClub?: DropdownClub;
}

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const CreateDashboard = () => {
  const [dashboard, setDashboard] = useState<Dashboard>(() => {
    const storedSelectedClub = localStorage.getItem("selectedClub");
    return storedSelectedClub
      ? { selectedClub: JSON.parse(storedSelectedClub) }
      : {};
  });

  console.log(dashboard);

  // temporary clubs array for dropdown
  // TODO: retrieve clubs of user and create array of type DropdownClub[]
  const testDropdownClubs = [
    { id: 1, name: "Club 1" },
    { id: 2, name: "Club 2" },
    { id: 3, name: "Club 3" },
    { id: 4, name: "Club 4" },
  ];
  return (
    <DashboardContextProvider.Provider value={[dashboard, setDashboard]}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeadingContainer}>
          <h2 className={styles.dashboardHeading}>dashboard</h2>

          <img className={styles.logo} src={WDCCLogoBlue} alt="WDCC Logo" />
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.rowOne}>
            <div
              className={`${styles.clubsContainer} ${styles.dashboardItemContainer}`}
            >
              <SelectClubDropdown clubs={testDropdownClubs} />
            </div>
            <div
              className={`${styles.adminShareContainer} ${styles.dashboardItemContainer}`}
            ></div>
            <div
              className={`${styles.clubAdminContainer} ${styles.dashboardItemContainer}`}
            ></div>
          </div>

          <div className={styles.rowTwo}>
            <div
              className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}
            ></div>

            <div className={styles.colTwoRowTwo}>
              <div
                className={`${styles.clubMembersContainer} ${styles.dashboardItemContainer}`}
              ></div>
              <div
                className={`${styles.usersContainer} ${styles.dashboardItemContainer}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
};

export default CreateDashboard;
