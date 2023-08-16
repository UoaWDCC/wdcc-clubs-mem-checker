import Link from "../../components/Link";
import { useState, useEffect } from "react";
import GoogleLogo from "../../assets/google-logo.svg";
import styles from "./style.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import InfoToolTip from "../../components/Tooltip";

export default function NoClubs() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("friend");
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({
        url: "/firstname",
      });
      setFirstName(res.data.firstName);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["text-div"]}>
        <p className={styles["no-clubs"]}>
          hi {firstName}, there are currently no clubs linked to your account.
        </p>
        <p className={styles.subtext}>
          please select one of the following options
        </p>
      </div>
      <div className={styles["button-div"]}>
        <Button
          buttonText="create club"
          backgroundColor="#03045E"
          onClick={() => navigate("/club-details")}
        />
        <div className={styles.adminAndToolTip}>
        <Button
          buttonText="join as club admin"
          backgroundColor="#087DF1"
          color="#03045E"
          border="#03045E 0.2rem solid"
          onClick={() => navigate("/invite-code")}
        ></Button>
        <InfoToolTip
          backgroundColor="#03045E" 
          color="#ffffff" 
          infoDescription="Manage an existing club in the system" 
          descBackgroundColor="#AAD3F7" 
          descColor="#087DF1"
          width="120px"
          descriptionLeft="24%" 
          triangleRight="90%"
        ></InfoToolTip>
        </div>
      </div>
    </div>
  );
}
