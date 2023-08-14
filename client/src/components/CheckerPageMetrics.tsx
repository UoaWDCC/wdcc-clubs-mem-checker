import styles from "./CheckerPageMetrics.module.css";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

export interface CheckerPageMetricsProps {
  temp ?: string;
}

const CheckerPageMetrics = ({
}: CheckerPageMetricsProps) => {
  /* time periods: last 7 days, last 2 weeks, last month, all time */
  const possibleTimePeriods = ["last 7 days", "last 2 weeks", "last month", "all time"] 
  const [timePeriod, setTimePeriod] = useState(possibleTimePeriods[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [statistic, setStatistic] = useState("N/A");

  const handleSelectTimePeriod = (time: string) => {
    setIsOpen(!isOpen)
    setTimePeriod(time)
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.subcontainer}
        style={{
          background: "transparent",
          height: "20%"
        }}
      >
        <div
          className = {styles.dropdown}
          style={{
            background: "#087DF1"
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className={styles.dropdownText}>{ timePeriod } </p>
          <div className={styles.dropdownArrow}>
            {!isOpen && <ArrowDown2 size="20" color="white"/>}
            {isOpen && <ArrowUp2 size="20" color="white"/>}
          </div>
        </div>
        {isOpen && 
          <div className={styles.dropdownList}>
            {possibleTimePeriods.map((time) => (
              <div
                className={styles.dropdownCard}
                onClick={() => handleSelectTimePeriod(time)}
                style={{transform: "translate(0%, 5.7vh)"}}
              >
                <p>{time}</p>
              </div>
            ))}
          </div>
        }
      </div>
      <div 
        className={styles.subcontainer}
        style={{
          background: "transparent",
          height: "40%"
        }}
      >
        <h1 className={styles.header}>number of users</h1>
        <h1 className={styles.subheader}>total number of checks performed</h1>
        <h1 className={styles.statisticText}>{statistic}</h1>
      </div>
      <div 
        className={styles.subcontainer}
        style={{
          background: "white",
          height: "40%"
        }}
      >
        <h1 className={styles.header}>duplicates found</h1>
        <h2 className={styles.subheader}>total number of existing memberships found</h2> 
        <h1 className={styles.statisticText}>{statistic}</h1>
      </div>
    </div>
  );
};

export default CheckerPageMetrics;