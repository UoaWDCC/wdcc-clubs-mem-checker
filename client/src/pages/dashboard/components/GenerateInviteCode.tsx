import styles from './GenerateInviteCode.module.css';
import Button from '../../../components/Button';
import axios from 'axios';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Copy, TickCircle } from 'iconsax-react';
import { CircularProgress } from '@mui/material';
import IDashboardContext from '../../../types/IDashboardContext';
import { DashboardContextProvider } from '../Dashboard';

const GenerateInviteCode = () => {
  // retrieve context
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const [copied, setIsCopied] = useState(false);
  const [generateDisabled, setGenerateDisabled] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [generateButtonColor, setGenerateButtonColor] = useState('#087DF1');
  const [generateButtonText, setGenerateButtonText] = useState('generate!');
  const [fontsize, setFontsize] = useState('1.4vh');
  const [text, setText] = useState('click generate');
  const [subheader, setSubheader] = useState(
    'click to generate a new invite code'
  );
  const [cancelTokenSource, setCancelTokenSource] = useState(
    axios.CancelToken.source()
  );

  const handleClick = () => {
    const newCancelToken = axios.CancelToken.source();
    setCancelTokenSource(newCancelToken);
    setGenerateDisabled(true);
    setGenerateButtonText('');
    setLoadingState(true);
    axios
      .get(`/club/create-invite-code/${dashboard.selectedClub?.id}`, {
        cancelToken: newCancelToken.token,
      })
      .then(function (response) {
        if (response.status === 200) {
          setText(response.data);
          setSubheader(
            'copy this invite code - you won’t get to see it again!'
          );
          setLoadingState(false);
          setGenerateButtonColor('#838383');
          setGenerateButtonText('code expires in 2 hours');
          setFontsize('1vh');
        }
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          // Handle the cancellation here
          console.log('Request canceled:', error.message);
        } else {
          console.error(error);
        }
      });
  };

  const resetLayout = () => {
    setSubheader('click to generate a new invite code');
    cancelTokenSource.cancel('Cancel generating code due to switching club');
    setLoadingState(false);
    setGenerateDisabled(false);
    setGenerateButtonColor('#087DF1');
    setGenerateButtonText('generate!');
    setText('click generate');
    setFontsize('1.4vh');
    setIsCopied(false);
  };

  useEffect(() => {
    resetLayout();
  }, [dashboard.selectedClub?.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    marginLeft: '16vw',
    marginTop: '-3.2vh',
  };

  const iconStyle = {
    color: '#03045E',
    size: 20,
  };

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
                    position: 'absolute',
                    color: '#FFFFFF',
                  }}
                  size="3vh"
                />
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
