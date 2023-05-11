import Background from "../../components/Background";
import styles from "./InviteCodePage.module.css";
import Textfield from "../../components/Textfield";

const InviteCodePage = () => {
  return (
    <Background>
      <div className={styles.container}>
        <div>
          <div className={styles.title}>
            <h1>enter invite code</h1>
          </div>
          <i className={styles.subtitle}>
            please enter the invite code sent by an existing club admin
          </i>
        </div>
        <Textfield
          backgroundColor="white"
          height="40px"
          placeholder="enter code here"
          textColour="#666666"
          width="95%"
        />
        <p className={styles.body}>
          if you don’t know what this is, please contact one of your club’s
          admins with an existing account in our system and ask them to share an
          invite code with you.
        </p>
        <button>Next</button>
      </div>
    </Background>
  );
};

export default InviteCodePage;
