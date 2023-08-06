import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';
import CopyIcon from "../assets/CopyIcon2.svg";
import CopyTickIcon from "../assets/CopyTickIcon.svg";
import { useState } from 'react';

export interface GenerateInviteCodeProps {
  text: string;
  onClick: () => void;
}

const GenerateInviteCode = ({
  onClick, text
  
}: GenerateInviteCodeProps) => {
  const [icon, setIcon] = useState(CopyIcon);
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
            {text !== "click generate" && (
            <img
              src={icon}
              alt="copy icon"
              style={{
                marginLeft: "0.5vw",
                marginTop: "0.25vh",
                cursor: "pointer",
                height: "2vh",
              }}
              onClick={() => {
                setIcon(CopyTickIcon);
                navigator.clipboard.writeText(text);
              }}
            />
            )}
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
