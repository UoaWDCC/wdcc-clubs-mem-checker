import styles from "./CheckerPageMetrics.module.css";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import axios from "axios";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { DashboardContextProvider } from "../Dashboard";
import IMetricRecord from "../../../../../api/routes/types/IMetricRecord";
import IPageMetrics from "../../../../../api/routes/types/IPageMetrics";
import IDashboardContext from "../../../types/IDashboardContext";

export interface CheckerPageMetricsProps {
  temp?: string;
}

const CheckerPageMetrics = ({}: CheckerPageMetricsProps) => {
  /* time periods: last 7 days, last 2 weeks, last month, all time */
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];
  if (
    dashboard.dashboardPage === undefined ||
    dashboard.selectedPageIndex === undefined ||
    dashboard.dashboardPage.pages[dashboard.selectedPageIndex] === undefined
  ) {
    return <div></div>;
  }

  const metrics =
    dashboard.dashboardPage.pages[dashboard.selectedPageIndex].metrics;
  const possibleTimePeriods = Object.keys(metrics);

  const [timePeriod, setTimePeriod] = useState(possibleTimePeriods[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [statistic, setStatistic] = useState<IMetricRecord>(
    metrics[possibleTimePeriods[0] as keyof IPageMetrics]
  );
  useEffect(() => {
    setStatistic(metrics[possibleTimePeriods[0] as keyof IPageMetrics]);
  }, [JSON.stringify(metrics)]);

  const handleSelectTimePeriod = (time: string) => {
    setIsOpen(!isOpen);
    setTimePeriod(time);
    setStatistic(metrics[time as keyof IPageMetrics]);
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
        <h1 className={styles.statisticText}>{statistic?.numberOfChecks}</h1>
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
          {statistic?.numberOfDuplicates}
        </h1>
      </div>
    </div>
  );
};

export default CheckerPageMetrics;
