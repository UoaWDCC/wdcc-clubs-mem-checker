import React, { useEffect, useState } from "react";
import CheckerPageMetrics from "./components/CheckerPageMetrics";
import ClubAdminsList from "./components/ClubAdminsList";
import styles from "./style.module.css";
import GenerateInviteCode from "./components/GenerateInviteCode";
import axios from "axios";
import CheckerPagePreview from "./components/CheckerPagePreview";
import WDCCLogoBlue from "../../assets/wdcc_blue_logo.svg";
import SelectClubDropdown from "./components/SelectClubDropdown";
import ClubSize from "./components/ClubSize";
import IDashboardContext from "../../types/IDashboardContext";
import IDropdownClub from "../../types/IDropdownClub";

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const Dashboard = () => {
  // retrieve user's list of clubs

  // load cached selected club
  const storedSelectedClub = localStorage.getItem("selectedClub");

  const [dashboard, setDashboard] = useState<IDashboardContext>({
    selectedClub: storedSelectedClub
      ? JSON.parse(storedSelectedClub)
      : undefined,
  });

  useEffect(() => {
    axios
      .get(`/dashboard/club-dashboard-endpoint/${dashboard.selectedClub?.id}`)
      .then((response) => {
        setDashboard({
          ...dashboard,
          dashboardPage: response.data,
          selectedPageIndex: 0,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dashboard.selectedClub]);

  const [code, setCode] = useState("click generate");
  const [isClicked, setClicked] = useState(false);
  const placeholder = () => {
    axios
      .get("/club/create-invite-code/63")
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setCode(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(dashboard);

  // temporary clubs array for dropdown
  // TODO: retrieve clubs of user and create array of type DropdownClub[]
  const testDropdownClubs: IDropdownClub[] = [
    { id: 1, name: "WDCC" },
    { id: 2, name: "SESA" },
    { id: 85, name: "random" },
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
            >
              <ClubAdminsList></ClubAdminsList>
            </div>
            <div
              className={`${styles.clubAdminContainer} ${styles.dashboardItemContainer}`}
            >
              <GenerateInviteCode
                text={code}
                onClick={placeholder}
                disabled={isClicked}
              />
            </div>
          </div>

          <div className={styles.rowTwo}>
            <div
              className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}
            >
              {dashboard.dashboardPage?.pages && (
                <CheckerPagePreview pages={dashboard.dashboardPage.pages} />
              )}
            </div>
            <div className={styles.colTwoRowTwo}>
              <div
                className={`${styles.clubMembersContainer} ${styles.dashboardItemContainer}`}
              >
                <ClubSize />
              </div>
              <div
                className={`${styles.usersContainer} ${styles.dashboardItemContainer}`}
              >
                <CheckerPageMetrics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
};

export default Dashboard;
