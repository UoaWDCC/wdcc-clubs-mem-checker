import Link from '../../components/Link';
import { useState, useEffect } from 'react';
import GoogleLogo from '../../assets/google-logo.svg';
import styles from './style.module.css';
import Button from '../../components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import InfoToolTip from '../../components/Tooltip';

export default function NoClubs() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('friend');
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/firstname');
      setFirstName(res.data.firstName);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['text-div']}>
        <p className={styles['no-clubs']}>
          hi {firstName}, there are currently no clubs linked to your account.
        </p>
        <p className={styles.subtext}>
          please select one of the following options
        </p>
      </div>
      <div className={styles['button-div']}>
        <Button
          width="13em"
          height="3em"
          buttonText="create club"
          backgroundColor="#03045E"
          onClick={() => navigate('/club-details')}
        />
        <div className={styles.adminAndToolTip}>
          <Button
            width="13em"
            height="3em"
            buttonText="join as club admin"
            backgroundColor="transparent"
            hoverColor="#03045E0F"
            color="#03045E"
            border="#03045E 0.2rem solid"
            onClick={() => navigate('/invite-code')}
          ></Button>
          <div className={styles.tooltip_container}>
            <InfoToolTip
              backgroundColor="#03045E"
              color="#ffffff"
              infoDescription="Manage an existing club in the system"
              descBackgroundColor="#AAD3F7"
              descColor="#087DF1"
              width="120px"
              descriptionLeft="1em"
              triangleRight="90%"
            ></InfoToolTip>
          </div>
        </div>
      </div>
    </div>
  );
}
