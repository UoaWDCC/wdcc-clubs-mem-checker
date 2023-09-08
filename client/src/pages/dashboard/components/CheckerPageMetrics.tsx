import styles from "./CheckerPageMetrics.module.css";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { DashboardContextProvider } from "../Dashboard";
import IDashboardContext from "../../../types/IDashboardContext";

const CheckerPageMetrics = () => {
  /* time periods: last 7 days, last 2 weeks, last month, all time */
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const metrics =
    dashboard.dashboardPage && dashboard.selectedPageIndex !== undefined
      ? dashboard.dashboardPage.pages[dashboard.selectedPageIndex].metrics
      : Object.create(null);
  const possibleTimePeriods = Object.keys(metrics);

  const [timePeriod, setTimePeriod] = useState<undefined | string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimePeriod(possibleTimePeriods[0]);
  }, [dashboard.dashboardPage && dashboard.selectedPageIndex !== undefined]);

  const handleSelectTimePeriod = (time: string) => {
    setIsOpen(!isOpen);
    setTimePeriod(time);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.subcontainer}
        style={{
          background: "transparent",
          height: "20%",
        }}
      >
        <div
          className={styles.dropdown}
          style={{
            background: "#087DF1",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className={styles.dropdownText}>{timePeriod} </p>
          <div className={styles.dropdownArrow}>
            {!isOpen && <ArrowDown2 size="20" color="white" />}
            {isOpen && <ArrowUp2 size="20" color="white" />}
          </div>
        </div>
        {isOpen && (
          <div className={styles.dropdownList}>
            {possibleTimePeriods.map((time) => (
              <div
                key={time}
                className={styles.dropdownCard}
                onClick={() => handleSelectTimePeriod(time)}
                style={{ transform: "translate(0%, 5.7vh)" }}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={styles.subcontainer}
        style={{
          background: "transparent",
          height: "40%",
        }}
      >
        <h1 className={styles.header}>number of users</h1>
        <h1 className={styles.subheader}>total number of checks performed</h1>
        <h1 className={styles.statisticText}>
          {timePeriod && metrics[timePeriod].numberOfChecks}
        </h1>
      </div>
      <div
        className={styles.subcontainer}
        style={{
          background: "white",
          height: "40%",
        }}
      >
        <h1 className={styles.header}>duplicates found</h1>
        <h2 className={styles.subheader}>
          total number of existing memberships found
        </h2>
        <h1 className={styles.statisticText}>
          {timePeriod && metrics[timePeriod].numberOfDuplicates}
        </h1>
      </div>
    </div>
  );
};

export default CheckerPageMetrics;
