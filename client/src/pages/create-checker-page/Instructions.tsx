import styles from './style.module.css';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

interface InstructionsProps {
  onNext: () => void;
  isLoading: boolean;
}

export default function Instructions({ onNext, isLoading }: InstructionsProps) {
  const handleOnNext = () => {
    if (isLoading) return;
    onNext();
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '10vh',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div className={styles.title}>
                <h1>link your google sheet</h1>
                <img src={GoogleSheetsLogo} />
              </div>
              <div className={styles.subtitle}>
                <p style={{ color: '#087DF1' }}>
                  share your google sheet with our service email to enable our
                  system's access
                </p>
              </div>
            </div>

            <div
              style={{ display: 'flex', width: '100%', flexDirection: 'row' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <div className={styles.numberCircle}>1</div>
                <svg
                  width="4rem"
                  height="2rem"
                  viewBox="-1.5 0 1 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="10%"
                    x2="0"
                    y2="90%"
                    strokeWidth={0.5}
                    stroke="#087DF1"
                  />
                </svg>
                <div className={styles.numberCircle}>2</div>
                <svg
                  width="4rem"
                  height="2rem"
                  viewBox="-1.5 0 1 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="10%"
                    x2="0"
                    y2="90%"
                    strokeWidth={0.5}
                    stroke="#087DF1"
                  />
                </svg>
                <div className={styles.numberCircle}>3</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '50%',
                  flexDirection: 'column',
                  rowGap: '20%',
                  textAlign: 'left',
                  marginLeft: '5%',
                }}
              >
                <p className={styles.blueParagraphText}>
                  <br />
                  click the share button on your google
                </p>
                <p className={styles.blueParagraphText}>
                  share with this email:{' '}
                  <span className={styles.bold}>
                    wdcc-membership-checker@membership-checker.iam.gserviceaccount.com
                  </span>
                </p>
                <p className={styles.blueParagraphText}>
                  click next to paste your google sheet link in the next step
                </p>
              </div>
            </div>

            <Button
              buttonText="next"
              height="40px"
              onClick={handleOnNext}
              fontSize="14px"
              isLoading={isLoading}
              width="80px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
