import Background from "../../components/Background";
import styles from "./InviteCodePage.module.css";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import WhiteBackArrow from "../../assets/BackArrow.svg";
import WhiteBackButton from "../../components/WhiteBackButton";

const InviteCodePage = () => {
  const handleOnClick = () => {};
  return (
    <Background>
      <div className={styles.container}>
        <div>
          {/* <Button
            buttonText=""
            onClick={handleOnClick}
            icon={WhiteBackArrow}
            iconSize="20px"
            backgroundColor="white"
            width="50px"
            height="50px"
            margin="0 500px 0 0"
          /> */}
          <div style={{ position: "absolute", top: "-10%", left: "-20%" }}>
            <WhiteBackButton onClick={handleOnClick} />
          </div>
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
        />
        <p className={styles.body}>
          if you don’t know what this is, please contact one of your club’s
          admins with an existing account in our system and ask them to share an
          invite code with you.
        </p>
        <Button
          buttonText="enter"
          onClick={() => {}}
          backgroundColor="#03045E"
          width="100px"
        />
      </div>
    </Background>
  );
};

export default InviteCodePage;
