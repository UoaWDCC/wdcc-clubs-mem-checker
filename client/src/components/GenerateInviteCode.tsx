import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';
// import CopyIcon from "../assets/CopyIcon2.svg";
// import CopyTickIcon from "../assets/CopyTickIcon.svg";
import { useState } from 'react';
import { Copy, CopySuccess } from 'iconsax-react';

export interface GenerateInviteCodeProps {
  text: string;
  onClick: () => void;
}

const GenerateInviteCode = ({
  onClick, text
  
}: GenerateInviteCodeProps) => {
  const [copied, setCopy] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopy(true);
  }
const buttonStyle = {
  background: "transparent", 
  border: "none", 
  outline: "none", 
  cursor: "pointer",
  marginTop: "0.25vh",
  marginLeft: "0.5vw"
};
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
            <button onClick={handleClick} style = {buttonStyle} > 
            {copied ? (
              <CopySuccess color = "#03045E" size = {20}/>
              ) : (
                <Copy color='#03045E' size = {20}/>
              )}</button>
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
