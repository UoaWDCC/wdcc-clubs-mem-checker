import styles from './style.module.css';
import WDCCLogo from '../../assets/wdcc_blue_logo.svg';
import femaleProgrammer from '../../assets/femaleProgrammer.svg';
import { useNavigate } from 'react-router';
import Button from '../../components/Button';

export const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/sign-in');
  };
  return (
    <div className={styles.home}>
      <title>Club Membership Checker</title>
      <img
        className={styles.logo}
        src={WDCCLogo}
        alt="WDCC Logo"
      />
      <div className={styles.home_container}>
        <div className={styles.col1}>
          <h1 className={styles.title}>Club Membership Checker</h1>

          <p className={styles.paragraph}>
            we’re here to make membership status checking super easy for you and
            your club members.
            <br />
            <br />
            simply link your club’s Google Sheet to create and customise your
            club’s checker page, and manage your data in the admin dashboard.
            <br />
            <br />
            <a href="/our-team">Developed by WDCC. Meet our Team!</a>
            <br />
            <a
              className="text-sm "
              href="/privacy-policy"
            >
              Our Privacy Policy
            </a>
          </p>
          <div className={styles.intro_button}>
            <Button
              buttonText="get started!"
              width="8.8em"
              height="3.5em"
              backgroundColor="transparent"
              hoverColor="#03045E0F"
              color="#03045E"
              border="3px solid #03045E"
              fontWeight="600"
              fontSize="1.2em"
              onClick={handleButtonClick}
            />
          </div>
        </div>

        <img
          className={`${styles.femaleProgrammer} ${styles.hide_for_mobile}`}
          src={femaleProgrammer}
          alt=""
        />
      </div>
    </div>
  );
};
