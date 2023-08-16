import React, { createContext, useContext, useEffect, useState } from "react";
import CheckerPageMetrics from "../../components/CheckerPageMetrics";
import ClubAdminsList from "../../components/ClubAdminsList";
import styles from "./style.module.css";
import GenerateInviteCode from "../../components/GenerateInviteCode";
import axios from "axios";
import CheckerPagePreview from "../../components/CheckerPagePreview";
import WDCCLogoBlue from "../../assets/wdcc_blue_logo.svg";
import SelectClubDropdown, {
  DropdownClub,
} from "./components/SelectClubDropdown";
import Page from "../../types/Page";
import { DashboardPage } from "../../../../api/routes/dashboard/club_dashboard";

export interface Dashboard {
  checkerPage?: DashboardPage;
  selectedClub?: DropdownClub;
  selectedPageId?: number; // stores the selected page id
}

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<Dashboard>({});

  // load cached selected club
  const storedSelectedClub = localStorage.getItem("selectedClub");
  dashboard.selectedClub = storedSelectedClub
    ? JSON.parse(storedSelectedClub)
    : undefined;

  useEffect(() => {
    axios
      .get(`/dashboard/club-dashboard-endpoint/${dashboard.selectedClub?.id}`)
      .then((response) => {
        setDashboard({
          ...dashboard,
          checkerPage: response.data,
          selectedPageId: 0,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dashboard.selectedClub]);

  // const pages = [
  //   {
  //     clubId: 1,
  //     clubName: "Example Club 1",
  //     title: "Checker Page Title 1",
  //     // Other data for page 1
  //     optionsList: [
  //       { originalName: "option1", displayName: "Option 1" },
  //       { originalName: "option2", displayName: "Option 2" },
  //       { originalName: "option3", displayName: "Option 3" },
  //     ],
  //     isOnboarding: true,
  //   },
  //   {
  //     clubId: 2,
  //     clubName: "Example Club 2",
  //     title: "Checker Page Title 2",
  //     // Other data for page 2
  //     optionsList: [
  //       { originalName: "option4", displayName: "Option 4" },
  //       { originalName: "option5", displayName: "Option 5" },
  //       { originalName: "option6", displayName: "Option 6" },
  //     ],
  //     isOnboarding: false,
  //   },
  //   // Add more pages as needed
  //   {
  //     clubId: 3,
  //     clubName: "Example Club 3",
  //     title: "Checker Page Title 3",
  //     // Other data for page 2
  //     optionsList: [
  //       { originalName: "option7", displayName: "Option 7" },
  //       { originalName: "option8", displayName: "Option 8" },
  //       { originalName: "option9", displayName: "Option 9" },
  //     ],
  //     isOnboarding: false,
  //   },
  // ];

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
  const testDropdownClubs: DropdownClub[] = [{ id: 1, name: "Club 1" }];
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
              {dashboard.checkerPage?.pages && (
                <CheckerPagePreview pages={dashboard.checkerPage.pages} />
              )}
            </div>
            <div className={styles.colTwoRowTwo}>
              <div
                className={`${styles.clubMembersContainer} ${styles.dashboardItemContainer}`}
              ></div>
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
