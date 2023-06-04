import styles from "./style.module.css";
import WDCCLogo from "../../assets/WdccLogo.svg";
import femaleStanding from "../../assets/femaleStanding.svg";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Textfield from "../../components/Textfield";

export const ConfimationPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/sign-in");
  };
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
        <p className={styles.paragraph}>
          click on the link below to see your fresh new page:
          <Textfield
            width="50vh"
            height="8vh"
            margin="5vh 0 2vh 0"
            fontSize="3vh"
          />
          you can update the configs for your page of create a new page from you
          club's admin dashboard
        </p>
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
          onClick={handleButtonClick}
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
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};
