import { DashboardContextProvider } from "../Dashboard";
import IDashboardContext from "../../../types/IDashboardContext";
import styles from "./ClubSize.module.css";
import { useState, useContext, Dispatch, SetStateAction } from "react";

interface ClubSizeProps {
  temp?: string;
}

const ClubSize = ({}: ClubSizeProps) => {
  const [clubSize, setClubSize] = useState(0);

  // retrieve context
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>number of club users</h1>
        <h2 className={styles.subheader}>
          specific to the Google Sheet for this checker page
        </h2>
        <h1 className={styles.sizeText}>999</h1>
      </div>
    </div>
  );
};

export default ClubSize;
