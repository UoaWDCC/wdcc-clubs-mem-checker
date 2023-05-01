import styles from './style.module.css';
import WDCCLogo from '../../assets/WDCCLogo.svg';
import femaleProgrammer from '../../assets/femaleProgrammer.svg';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/example');
  };
  return (
    <div>
      <title>Club Membership Checker</title>
      
      <img className = {styles.logo} src={WDCCLogo} alt="WDCC Logo"/>
      
      <div>
        <h1 className = {styles.h1}>Club Membership Checker</h1>
      </div>
      
      <div>
        <p className = {styles.h1}>we’re here to make membership status checking super easy for you and your club members. <br /><br />simply link your club’s Google Sheet to create and customise your club’s checker page, and manage your data in the admin dashboard.</p>
      </div>

      <img className = {styles.femaleProgrammer} src={femaleProgrammer} alt="" width={100} height={500} />

      <button className = {styles.button} onClick={handleButtonClick}>get started!</button>
    </div>
  );
};
  