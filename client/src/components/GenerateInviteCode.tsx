import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';

export interface GenerateInviteCodeProps {
  text?: string;
  onClick: () => void;
}

const GenerateInviteCode = ({
  onClick, text
}: GenerateInviteCodeProps) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>invite new admin</h1>
          <h2 className={styles.subheader}>click to generate a new invite code</h2>
        </div>
        <div className={styles.subcontainer}>
          <div className={styles.text}>
            { text }
          </div>
          <Button
            width="6vw"
            height="5vh"
            buttonText='generate!'
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};

export default GenerateInviteCode;
