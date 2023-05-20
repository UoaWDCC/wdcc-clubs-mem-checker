import Background from "../../components/Background";
import styles from "./InviteCodePage.module.css";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import { BackSquare } from "iconsax-react"; 
import axios from "axios";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";

const InviteCodePage = () => {
  const navigate = useNavigate();

  const inviteCode = useRef<HTMLInputElement>(null);
  const [inviteCodeError, setInviteCodeError] = useState<boolean>(false);
  const handleOnBack = () => {
    navigate("/no-clubs");
  };
  const handleOnNext = () => {
    const url =
      "http://localhost:3000/club/verify-invite-code/" +
      inviteCode.current?.value;
    axios
      .get(url)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        setInviteCodeError(true);
        console.log(error);
      });
  };
  return (
    <Background>
      <div className={styles.container}>
        <div>
          <Button
            buttonText=""
            onClick={handleOnBack}
            iconFromIconsax={<BackSquare/>}
            iconSize="50px"
            height="45px"
            width="45px"
            backgroundColor="#087DF1"
            margin="0 500px 0 0"
            color="#FFFFFF"
            padding="0px"
            borderRadius="20px"
            translateX="-2.5px"
            translateY="-2.5px"
          />
          {/*<div style={{ position: "absolute", top: "-10%", left: "-20%" }}>
            <WhiteBackButton onClick={handleOnBack} />
          </div>*/}
          <div className={styles.title}>
            <h1>enter invite code</h1>
          </div>
          <i className={styles.subtitle}>
            please enter the invite code sent by an existing club admin
          </i>
        </div>
        <Textfield
          backgroundColor="#ffffff"
          height="40px"
          placeholder="enter code here"
          width="95%"
          placeholderTextAlign="center"
          isError={inviteCodeError}
          ref={inviteCode}
          errorText="invalid invite code"
        />
        <p className={styles.body}>
          if you don’t know what this is, please contact one of your club’s
          admins with an existing account in our system and ask them to share an
          invite code with you.
        </p>
        <Button
          buttonText="enter"
          onClick={handleOnNext}
          backgroundColor="#03045E"
          width="100px"
        />
      </div>
    </Background>
  );
};

export default InviteCodePage;
