import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function GoogleCallback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingText, setLoadingText] = useState('Signing in with Google...');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const code = searchParams.get('code');
      if (!code) setLoadingText('Error: Could not sign in with Google.');
      const res = await axios.post('/auth/google/callback', {
        code,
      });
      const { isInClub } = res.data;
      if (!isInClub) {
        setLoadingText('Error: Could not sign in with Google.');
      }

      // if (isInClub) {
      //   navigate('/dashboard');
      // } else {
      //   navigate('/no-clubs');
      // }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.text}>{loadingText}</p>
    </div>
  );
}
