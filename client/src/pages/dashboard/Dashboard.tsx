import styles from './style.module.css';
import WDCCLogoBlue from '../../assets/wdcc_blue_logo.svg';
import React, { createContext, useContext, useEffect, useState } from 'react';
import DashboardPage from './DashboardPage';
import CheckerPagePreview from "../../components/CheckerPagePreview";

export interface Dashboard {
  checkerPage ?: string;  
  selectedClub ?: string;

}

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const CreateDashboard = () => {

  const [dashboard, setDashboard] = useState<Dashboard>(() => {
    const storedSelectedClub = localStorage.getItem('selectedClub');
    return storedSelectedClub ? {checkerPage: JSON.parse(storedSelectedClub)} : {};
  })

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
      clubId: 2,
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
      clubId: 3,
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

  console.log(dashboard)

  return (
    <DashboardContextProvider.Provider value={[dashboard, setDashboard]}>
      <div className={ styles.dashboardContainer }>
        <div className={ styles.dashboardHeadingContainer }>
          <h2 className={ styles.dashboardHeading }>dashboard</h2>

          <img
              className={styles.logo}
              src={WDCCLogoBlue}
              alt="WDCC Logo"
            />
        </div>
        
        <div className={ styles.gridContainer }>
          <div className={ styles.rowOne }>
            <div className={ `${styles.clubsContainer} ${styles.dashboardItemContainer}` }></div>
            <div className={ `${styles.adminShareContainer} ${styles.dashboardItemContainer}` }></div>
            <div className={ `${styles.clubAdminContainer} ${styles.dashboardItemContainer}` }></div>
          </div>

          <div className={ styles.rowTwo }>
            <div className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}>
              <CheckerPagePreview pages={pages} />
            </div>

            <div className={ styles.colTwoRowTwo }>
              <div className={ `${styles.clubMembersContainer} ${styles.dashboardItemContainer}` }></div>
              <div className={ `${styles.usersContainer} ${styles.dashboardItemContainer}` }></div>
            </div>
          </div>

        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
}

export default CreateDashboard;