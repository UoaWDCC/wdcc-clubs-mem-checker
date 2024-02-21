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
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <title>Club Membership Checker</title>
      <img
        className="absolute top-[3em] right-[3em] w-[9em] h-auto"
        src={WDCCLogo}
        alt="WDCC Logo"
      />
      <div className="flex flex-row gap-10 items-start px-8">
        <div>
          <h1 className="text-[#183249] text-3xl font-display font-bold">
            Club Membership Checker
          </h1>

          <p className="text-[#183249] text-lg font-sans font-normal">
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
              className="text-sm"
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
          className="top-[7em] w-auto h-[30em] hidden md:flex"
          src={femaleProgrammer}
          alt=""
        />
      </div>
    </div>
  );
};
