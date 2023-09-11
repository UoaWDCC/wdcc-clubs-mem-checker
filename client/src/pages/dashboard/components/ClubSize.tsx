import { DashboardContextProvider } from "../Dashboard";
import IDashboardContext from "../../../types/IDashboardContext";
import styles from "./ClubSize.module.css";
import { useContext, Dispatch, SetStateAction } from "react";

const ClubSize = () => {
  // retrieve context
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  let memberCount;
  const selectedPageIndex = dashboard.selectedPageIndex;
  if (selectedPageIndex !== undefined) {
    const pageId = dashboard.dashboardPage?.pages[selectedPageIndex].id;
    if (pageId !== undefined) {
      memberCount =
        dashboard.dashboardPage?.memberCountByPageId[pageId].totalMembers;
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>number of club users</h1>
        <h2 className={styles.subheader}>
          specific to the Google Sheet for this checker page
        </h2>
        <h1 className={styles.sizeText}>
          {memberCount !== undefined ? memberCount : "N/A"}
        </h1>
      </div>
    </div>
  );
};

export default ClubSize;
