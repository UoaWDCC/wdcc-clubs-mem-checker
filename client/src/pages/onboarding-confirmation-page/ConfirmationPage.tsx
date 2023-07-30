import styles from "./style.module.css";
import WDCCLogo from "../../assets/WdccLogo.svg";
import CopyIcon from "../../assets/CopyIcon2.svg";
import CopyTickIcon from "../../assets/CopyTickIcon.svg";
import femaleStanding from "../../assets/femaleStanding.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export const ConfimationPage = () => {
  const navigate = useNavigate();
  const handleDashboardButtonClick = () => {
    navigate("/dashboard");
  };

  const handleCreateAnotherButtonClick = () => {
    navigate("/create-page", { state: location.state.clubDetails });
  };

  const [icon, setIcon] = useState(CopyIcon);

  const location = useLocation();

  // uncomment this line when we have te link from the other page and comment the line below
  const link = "https://www.wdcc.com/" + location.state.pathId;
  // const link = "https://www.wdcc.com/laurhliapoiueroij";

  return (
    <div>
      <title>Onboarding Confirmation Page</title>

      <img className={styles.logo} src={WDCCLogo} alt="WDCC Logo" />

      <div>
        <h1 className={styles.title}>
          your club's membership checker page has been created!
        </h1>
      </div>

      <div>
        <div className={styles.paragraph}>
          click on the link below to see your fresh new page:
          <div
            style={{
              background: "#E0E0E0",
              height: "10vh",
              color: "#707070",
              display: "flex",
              alignItems: "center",
              marginTop: "2vh",
              marginBottom: "2vh",
              borderRadius: "8px",
              paddingLeft: "1vw",
            }}
          >
            <div
              style={{
                fontWeight: "900",
                fontStyle: "italic",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <a
                href={link}
                target="_blank"
                style={{ color: "#707070", fontSize: "2.5vh" }}
              >
                {link}
              </a>
            </div>
            <img
              src={icon}
              alt="copy icon"
              style={{
                marginLeft: "auto",
                marginRight: "2vw",
                cursor: "pointer",
              }}
              onClick={() => {
                setIcon(CopyTickIcon);
                navigator.clipboard.writeText(link);
              }}
            />
          </div>
          you can update the configs for your page of create a new page from you
          club's admin dashboard
        </div>
      </div>

      <img
        className={styles.femaleProgrammer}
        src={femaleStanding}
        alt=""
        width={100}
        height={500}
      />

      <div className={styles.intro_button}>
        <Button
          buttonText="go to dashboard"
          width="20vw"
          height="6vw"
          backgroundColor="#087DF1"
          border="#FFD166 solid 6px"
          borderRadius="8px"
          fontWeight="600"
          fontSize="1.4vw"
          margin="5vh 5vh 0 0"
          onClick={handleDashboardButtonClick}
        />
        <Button
          buttonText="create another page"
          width="20vw"
          height="6vw"
          backgroundColor="#FFD166"
          border="None"
          fontWeight="600"
          fontSize="1.4vw"
          margin="5vh 0 0 "
          onClick={handleCreateAnotherButtonClick}
        />
      </div>
    </div>
  );
};
