import styles from './style.module.css';
import WDCCLogo from '../../assets/WdccLogo.svg';
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
              src={WDCCLogo}
              alt="WDCC Logo"
            />
        </div>
        
        <div className={ styles.gridContainer }>
          <div className={ styles.columnOne }>
            <div className={ `${styles.clubsContainer} ${styles.dashboardItemContainer}` }></div>
            <div className={ `${styles.adminShareContainer} ${styles.dashboardItemContainer}` }></div>
          </div>

          <div className={ styles.columnTwo }>
            <div className={ `${styles.clubDetailsContainer} ${styles.dashboardItemContainer}` }></div>
            <div className={ `${styles.usersContainer} ${styles.dashboardItemContainer}` }></div>
          </div>

          <div className={ styles.columnThree }>
            <div className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}></div>
            <div className={ `${styles.apiKeysContainer} ${styles.dashboardItemContainer}` }></div>
          </div>
        </div>
      </div>
    </DashboardContextProvider.Provider>
  );
}

export default CreateDashboard;