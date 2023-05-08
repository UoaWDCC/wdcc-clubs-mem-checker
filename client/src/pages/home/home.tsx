import styles from './style.module.css';
import WDCCLogo from '../../assets/WdccLogo.svg';
import femaleProgrammer from '../../assets/femaleProgrammer.svg';
import { useNavigate } from 'react-router';
import Button from '../../components/Button'

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
        <h1 className = {styles.title}>Club Membership Checker</h1>
      </div>
      
      <div>
        <p className = {styles.paragraph}>we’re here to make membership status checking super easy for you and your club members. <br /><br />simply link your club’s Google Sheet to create and customise your club’s checker page, and manage your data in the admin dashboard.</p>
      </div>

      <img className = {styles.femaleProgrammer} src={femaleProgrammer} alt="" width={100} height={500} />

      <div className={styles.intro_button}>
        <Button buttonText='get started!' width='15vw' height="6vw" backgroundColor='#FFD166' border='None' fontWeight='600' fontSize='1.6vw' onClick={handleButtonClick} />
      </div>
    </div>
  );
};
  