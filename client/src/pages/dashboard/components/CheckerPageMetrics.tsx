import styles from "./CheckerPageMetrics.module.css";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { DashboardContextProvider } from "../Dashboard";
import IDashboardContext from "../../../types/IDashboardContext";

const getKeyFromDisplayString = (
  displayString: string,
  map: { [key: string]: string }
) => {
  for (const key in map) {
    if (map[key] === displayString) {
      return key;
    }
  }
  return map[Object.keys(map)[0]];
};

const CheckerPageMetrics = () => {
  /* time periods: last 7 days, last 2 weeks, last month, all time */
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const metrics =
    dashboard.dashboardPage?.pages.length !== 0 &&
    dashboard.dashboardPage &&
    dashboard.selectedPageIndex !== undefined
      ? dashboard.dashboardPage.pages[dashboard.selectedPageIndex].metrics
      : Object.create(null);

  const possibleTimePeriodsDisplay: { [key: string]: string } = {
    allTime: "all time",
    lastDay: "last day",
    last7Days: "last 7 days",
    last30Days: "last 30 days",
  };
  const possibleTimePeriods = Object.keys(metrics);

  const [timePeriod, setTimePeriod] = useState<undefined | string>();
  const [isOpen, setIsOpen] = useState(false);

  // Ref for the dropdown title
  const dropdownTitleRef = useRef<HTMLDivElement>(null);
  // Ref for the dropdown list element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close the dropdown when clicking outside of it
  const closeDropdownOnOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      dropdownTitleRef.current &&
      !dropdownTitleRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", closeDropdownOnOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    setTimePeriod(possibleTimePeriodsDisplay[possibleTimePeriods[0]]);
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
          ref={dropdownTitleRef}
          className={styles.dropdown}
          style={{
            background: "#087DF1",
          }}
          onClick={
            Object.getPrototypeOf(metrics) === null
              ? () => {}
              : () => setIsOpen(!isOpen)
          }
        >
          <p className={styles.dropdownText}>
            {Object.getPrototypeOf(metrics) === null ? "N/A" : timePeriod}{" "}
          </p>
          <div className={styles.dropdownArrow}>
            {!isOpen && <ArrowDown2 size="20" color="white" />}
            {isOpen && <ArrowUp2 size="20" color="white" />}
          </div>
        </div>
        {isOpen && (
          <div ref={dropdownRef} className={styles.dropdownList}>
            {Object.values(possibleTimePeriodsDisplay).map((time) => (
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
          {Object.getPrototypeOf(metrics) === null
            ? "N/A"
            : timePeriod &&
              metrics[
                getKeyFromDisplayString(timePeriod, possibleTimePeriodsDisplay)
              ].numberOfChecks}
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
          {Object.getPrototypeOf(metrics) === null
            ? "N/A"
            : timePeriod &&
              metrics[
                getKeyFromDisplayString(timePeriod, possibleTimePeriodsDisplay)
              ].numberOfDuplicates}
        </h1>
      </div>
    </div>
  );
};

export default CheckerPageMetrics;
