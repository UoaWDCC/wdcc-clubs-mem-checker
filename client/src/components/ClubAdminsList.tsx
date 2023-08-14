import { Dispatch, SetStateAction, useContext, useState } from "react";
import { DashboardContextProvider, Dashboard } from "../pages/dashboard/Dashboard";
import styles from "./ClubAdminsList.module.css"

const ClubAdminsList = () => {
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    Dashboard,
    Dispatch<SetStateAction<Dashboard>>
  ];

  //const admins = dashboard.clubAdmins || []; //Need to rename this when I find out what the name being saved to the context is
  const admins = ["Adam McKinsley", "Bob Arthur", "Cindy Wong", "Amanda Young"];

  return (
    <>
        <div className={ styles.classListContainer }> 
        <h1 className={ styles.classListHeader }>club admins</h1>
        <div className={ styles.namesContainer }>
            {admins.map((admin) => (
                <p className={ styles.adminName }>{admin}</p>
            ))}
        </div>
        </div>
        
    </>
  );
};

export default ClubAdminsList;