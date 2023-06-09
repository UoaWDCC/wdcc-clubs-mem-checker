import SignInDoor from '../../assets/sign-in-through-door.svg';
import GoogleLogo from '../../assets/google-white-background.svg';
import styles from './style.module.css';
import Link from '../../components/Link';

export function GoogleSignIn() {
  return (
    <div className={styles.container}>
      <img
        className={styles['door-image']}
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
        <Link
          linkText="sign in"
          icon={GoogleLogo}
          backgroundColor="#03045E"
          iconSize="40"
          fontSize="1.5rem"
          href="http://localhost:3000/auth/google"
        />
      </div>
    </div>
  );
}
