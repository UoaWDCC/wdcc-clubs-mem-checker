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
  const [showCopyIcon, setShowCopyIcon] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  }

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
  marginTop: '-2.6vh',
  opacity: showCopyIcon ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
};

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
              <TickCircle color = "#03045E" size = {20}/>
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
