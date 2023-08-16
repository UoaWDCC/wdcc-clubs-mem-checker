
import React, { createContext, useContext, useEffect, useState } from 'react';
import DashboardPage from './DashboardPage';
import CheckerPageMetrics from '../../components/CheckerPageMetrics';
import ClubAdminsList from '../../components/ClubAdminsList';
import styles from "./style.module.css";
import GenerateInviteCode from "../../components/GenerateInviteCode";
import axios from "axios";
import CheckerPagePreview from "../../components/CheckerPagePreview";
import WDCCLogoBlue from "../../assets/wdcc_blue_logo.svg";
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
      ? { checkerPage: JSON.parse(storedSelectedClub) }
      : {};
  });

  const pages = [
    {
      clubId: 1,
      clubName: "Example Club 1",
      title: "Checker Page Title 1",
      // Other data for page 1
      optionsList: [
        { originalName: "option1", displayName: "Option 1" },
        { originalName: "option2", displayName: "Option 2" },
        { originalName: "option3", displayName: "Option 3" },
      ],
      isOnboarding: true,
    },
    {
      clubId: 1,
      clubName: "Example Club 2",
      title: "Checker Page Title 2",
      // Other data for page 2
      optionsList: [
        { originalName: "option4", displayName: "Option 4" },
        { originalName: "option5", displayName: "Option 5" },
        { originalName: "option6", displayName: "Option 6" },
      ],
      isOnboarding: false,
    },
    // Add more pages as needed
    {
      clubId: 1,
      clubName: "Example Club 3",
      title: "Checker Page Title 3",
      // Other data for page 2
      optionsList: [
        { originalName: "option7", displayName: "Option 7" },
        { originalName: "option8", displayName: "Option 8" },
        { originalName: "option9", displayName: "Option 9" },
      ],
      isOnboarding: false,
    },
  ];

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
  const testDropdownClubs: DropdownClub[] = [
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
             <div className={ `${styles.adminShareContainer} ${styles.dashboardItemContainer}` }><ClubAdminsList></ClubAdminsList></div>
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
              <CheckerPagePreview pages={pages} />
            </div>
            <div className={ styles.colTwoRowTwo }>
              <div className={ `${styles.clubMembersContainer} ${styles.dashboardItemContainer}` }></div>
              <div className={ `${styles.usersContainer} ${styles.dashboardItemContainer}` }>
                <CheckerPageMetrics />
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
};

export default CreateDashboard;
