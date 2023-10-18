import SignInDoor from '../../assets/sign-in-through-door.svg';
import GoogleLogo from '../../assets/google-white-background.svg';
import styles from './style.module.css';
import Link from '../../components/Link';
import WDCCLogo from '../../assets/wdcc_blue_logo.svg';

import { AnchorLink } from '../../components/Link';

export function GoogleSignIn() {
  return (
    <div className={styles.sign_in_page}>
      <img className={styles.logo} src={WDCCLogo} alt="WDCC Logo" />
      <div className={styles.container}>
        <img
          className={`${styles['door-image']} ${styles.hide_for_mobile}`}
          width={600}
          height={600}
          src={SignInDoor}
        />
        <div className={styles['sign-in-container']}>
          <div className={styles.text}>
            <p className={styles.title}>sign in</p>
            <p className={styles.subtitle}>
              please sign in with your Google account to proceed.
            </p>
          </div>
          <AnchorLink
            linkText="sign in"
            icon={GoogleLogo}
            backgroundColor="#03045E"
            iconSize="40"
            fontSize="1.5rem"
            href={
              import.meta.env.MODE == 'production'
                ? '/api/auth/google'
                : 'http://localhost:3000/api/auth/google'
            }
          />
        </div>
      </div>
    </div>
  );
}
