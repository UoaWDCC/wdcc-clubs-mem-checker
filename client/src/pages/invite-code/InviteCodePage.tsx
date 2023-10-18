import Background from '../../components/Background';
import styles from './InviteCodePage.module.css';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { InfoCircle } from 'iconsax-react';

const InviteCodePage = () => {
  const navigate = useNavigate();

  const inviteCode = useRef<HTMLInputElement>(null);
  const [inviteCodeError, setInviteCodeError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnBack = () => {
    navigate('/no-clubs');
  };
  const handleOnNext = () => {
    setIsLoading(true);
    axios
      .get(`/club/verify-invite-code/${inviteCode.current?.value}`)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setIsLoading(false);
          navigate('/dashboard');
        }
      })
      .catch(function (error) {
        setInviteCodeError(true);
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <Background>
      <div className={styles.container}>
        <BackButton
          onClick={handleOnBack}
          size="40px"
          backgroundColor="transparent"
          margin="0 500px 0 0"
          color="#183249"
          hoverColor="#03045E0F"
        />
        <div className={styles.title}>
          <h1>enter invite code</h1>
        </div>
        <i className={styles.subtitle}>
          please enter the invite code sent by an existing club admin
        </i>
        <div className={styles.textfield}>
          <Textfield
            backgroundColor="#ffffff"
            height="3rem"
            fontSize="1.2rem"
            placeholder="enter code here"
            width="100%"
            textAlign="center"
            ref={inviteCode}
            isError={inviteCodeError}
          />
          {inviteCodeError && (
            <>
              <div className={styles['error-arrow']}></div>
              <div className={styles['error-box']}>
                <div className={styles.errorTextAndIcon}>
                  <InfoCircle size="15" color="#ffffff"/><p className={styles.errorText}>invalid code</p>
                </div>
              </div>
            </>
          )}
        </div>

        <p className={styles.body}>
          if you don’t know what this is, please contact one of your club’s
          admins with an existing account in our system and ask them to share an
          invite code with you.
        </p>
        <Button
          buttonText="submit"
          onClick={handleOnNext}
          backgroundColor="#03045E"
          width="8rem"
          height="2.8rem"
          isLoading={isLoading}
        />
      </div>
    </Background>
  );
};

export default InviteCodePage;
