import styles from './GenerateInviteCode.module.css';
import Button from './Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Copy, TickCircle } from 'iconsax-react';

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
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const [generateButtonColor, setGenerateButtonColor] = useState('#087DF1');
  const [generateButtonText, setGenerateButtonText] = useState('generate!');
  const [fontsize, setFontsize] = useState("1rem");

  const handleClick = () => {
    
    if (!generateDisabled) {
      setGenerateDisabled(true);
      setGenerateButtonColor('#838383');
      setGenerateButtonText('code expires in 2 hours');
      setFontsize("0.75rem");
      onClick();
      
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopyIcon(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [copied]);

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  marginLeft: '7.75vw',
  marginTop: '-2.75vh',
  opacity: showCopyIcon ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
};

const iconStyle = {
  color: '#03045E',
  size: 20,
}

setTimeout(() => setIsCopied(false), 7500);
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
            <button onClick={handleCopy} style = {buttonStyle} > 
            {copied ? (
              <TickCircle style={iconStyle}/>
              ) : (
                <Copy style={iconStyle}/>
              )}</button>
            )}
          </div>
          <Button
            width="6vw"
            height="5vh"
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
    </>
  );
};

export default GenerateInviteCode;
