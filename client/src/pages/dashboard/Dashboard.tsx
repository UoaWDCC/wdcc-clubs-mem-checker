import styles from './style.module.css';
import WDCCLogo from '../../assets/WdccLogo.svg';

export default function Dashboard() {
  return (
    <>
    
    
    <div className={ styles.dashboardContainer }>
      <img
          className={styles.logo}
          src={WDCCLogo}
          alt="WDCC Logo"
        />
      
      <div className={ styles.gridContainer }>
        <div className={ styles.columnOne }>
          <div className={ `${styles.clubDropdownContainer} ${styles.dashboardItemContainer}` }></div>

          <div className={ `${styles.clubDetailsContainer} ${styles.dashboardItemContainer}` }></div>

          <div className={ `${styles.usersContainer} ${styles.dashboardItemContainer}` }></div>
        </div>

        <div className={ styles.columnTwo }>
          <div className={ `${styles.linkContainer} ${styles.dashboardItemContainer}` }></div>

          <div className={ styles.columnTwoRowTwoContainer }>
            <div className={`${styles.pagePreviewContainer} ${styles.dashboardItemContainer}`}></div>

            <div className={ styles.columnTwoRowTwoColumnTwoContainer }>
              <div className={ `${styles.adminShareContainer} ${styles.dashboardItemContainer}` }></div>

              <div className={ `${styles.apiKeysContainer} ${styles.dashboardItemContainer}` }></div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}