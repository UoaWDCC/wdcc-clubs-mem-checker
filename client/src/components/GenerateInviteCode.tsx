import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';

export interface GenerateInviteCodeProps {

  onClick: () => void;
}

const GenerateInviteCode = ({
  onClick,
}: GenerateInviteCodeProps) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>generate invite code</h1>
          <h2 className={styles.subheader}>add text here</h2>
        </div>
        <div className={styles.subcontainer}>
          <div className={styles.text}>
          </div>
          <Button
            width="6vw"
            height="5vh"
            buttonText='Generate'
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};

export default GenerateInviteCode;
