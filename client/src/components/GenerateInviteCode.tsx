import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Copy, TickCircle } from 'iconsax-react';
import { CircularProgress } from '@mui/material';
export interface GenerateInviteCodeProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const GenerateInviteCode = ({
  onClick, text, disabled
  
}: GenerateInviteCodeProps) => {
  const [copied, setIsCopied] = useState(false);
  const [generateDisabled, setGenerateDisabled] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [generateButtonColor, setGenerateButtonColor] = useState('#087DF1');
  const [generateButtonText, setGenerateButtonText] = useState('generate!');
  const [fontsize, setFontsize] = useState("1rem");
  const [inviteText, setInviteText] = useState("click to generate a new invite code");

  const handleClick = () => {
    if (!generateDisabled) {
      setGenerateDisabled(true);
      setGenerateButtonText("");
      setLoadingState(true);
      onClick();
    }
  };

  const handleLoading = () => {
    setLoadingState(false);
    setGenerateButtonColor('#838383');
    setGenerateButtonText('code expires in 2 hours');
    setFontsize("0.75rem");
    setInviteText("copy this invite code - you won't get to see it again!");
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  marginLeft: '13rem',
  marginTop: '-1.6rem',
};

const iconStyle = {
  color: '#03045E',
  size: 20,
}

useEffect(() => {
  if(text !== "click generate") {
    handleLoading();
  }
}, [text]);

setTimeout(() => setIsCopied(false), 7500);
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>invite new admin</h1>
          <h2 className={styles.subheader}>{inviteText}</h2>
        </div>
        <div className={styles.subcontainer}>
          <div className={styles.text}>
            { text }
            {text !== "click generate" && (
            <button onClick={handleCopy} style = {buttonStyle} > 
            {copied ? (
              <TickCircle style={iconStyle}/>
              ) : (
                <Copy style={iconStyle}/>
              )}</button>
            )}
          </div>
          <div className={styles.divider}>
            { loadingState ? 
              <div style={{width: "100%", transform: "translate(calc(50% - 20px), 5px)"}}>
                <CircularProgress 
                  className={styles.loadingSign}
                  style={{
                    position: 'absolute', 
                  }}
                  sx={{
                    color: '#FFFFFF',
                    width: "200px",
                    fontSize: '1rem',
                  }}
                />
              </div> : ""
            }
            
          <Button
            width="8rem"
            height="3rem"
            backgroundColor={generateButtonColor}
            buttonText={generateButtonText}
            onClick={handleClick}
            disabled={generateDisabled}
            color="#FFFFFF"
            fontSize={fontsize}
            fontWeight='400'
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateInviteCode;
