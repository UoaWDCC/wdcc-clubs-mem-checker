import styles from './style.module.css';
import WDCCLogoBlue from '../../assets/wdcc_blue_logo.svg';
import React, { createContext, useContext, useState } from 'react';

export interface Dashboard {
  checkerPage ?: string;  
  selectedClub ?: string;

}

export const DashboardContextProvider = React.createContext([{}, () => {}]);

const CreateDashboard = () => {

  const [dashboard, setDashboard] = useState<Dashboard>({}); // Need to set default here

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
            <div className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}></div>

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