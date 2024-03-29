import styles from "./GenerateInviteCode.module.css";
import Button from "./Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Copy, TickCircle } from "iconsax-react";
import { CircularProgress } from "@mui/material";
export interface GenerateInviteCodeProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const GenerateInviteCode = ({
  onClick,
  text,
  disabled,
  onClick,
  text,
  disabled,
}: GenerateInviteCodeProps) => {
  const [copied, setIsCopied] = useState(false);
  const [generateDisabled, setGenerateDisabled] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [generateButtonColor, setGenerateButtonColor] = useState("#087DF1");
  const [generateButtonText, setGenerateButtonText] = useState("generate!");
  const [fontsize, setFontsize] = useState('1.4vh');
  const [subheader, setSubheader] = useState(
    
    'click to generate a new invite code'
  
  );

  const handleClick = () => {
    if (!generateDisabled) {
      setGenerateDisabled(true);
      setGenerateButtonText('');
      setLoadingState(true);
      onClick();
    }
  };

  const handleLoading = () => {
    setLoadingState(false);
    setGenerateButtonColor("#838383");
    setGenerateButtonText("code expires in 2 hours");
    setFontsize('1vh');
    setSubheader('copy this invite code - you won’t get to see it again!');
  };;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
      marginLeft: "16vw",
      marginTop: "-3.2vh",
    };

  const iconStyle = {
    color: '#03045E',
    size: 20,
  };

    useEffect(() => {
      if  (text !== 'click generate') {
        handleLoading();
      }
    }, [text]);

  setTimeout(() => setIsCopied(false), 7500);
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>invite new admin</h1>
          <h2 className={styles.subheader}>{subheader}</h2>
        </div>
        <div className={styles.subcontainer}>
          <div className={styles.text}>
            {text}
            {text !== 'click generate' && (
              <button
                onClick={handleCopy}
                style={buttonStyle}
              >
                {copied ? (
                  <TickCircle style={iconStyle} />
                ) : (
                  <Copy style={iconStyle} />
                )}
              </button>
            )}
          </div>
          <div>
            {loadingState ? (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  transform: 'translate(calc(50% - 1.5vh), 1vh)',
                }}
              >
                <CircularProgress
                  className={styles.loadingSign}
                  sx={{
                    position: "absolute",
                    color: "#FFFFFF",
                  }}
                  size="3vh"
                />
                '
              </div>
            ) : (
              ''
            )}

            <Button
              width="6vw"
              height="5vh"
              backgroundColor={generateButtonColor}
              buttonText={generateButtonText}
              onClick={handleClick}
              disabled={generateDisabled}
              color="#FFFFFF"
              fontSize={fontsize}
              fontWeight="400"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateInviteCode;
