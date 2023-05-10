import Button from "../Button";
import styles from "./style.module.css";

interface NewClubAddedProps {
  clubName?: string;
}

const NewClubAdded = ({ clubName }: NewClubAddedProps) => {
  const handleOnClick = () => {
    console.log("done");
  };
  return (
    <div className={styles.container}>
      <div id={styles.backButton}></div>
      <div>
        <h1
          style={{
            color: "#087DF1",
            fontFamily: "Montserrat",
            fontSize: "3rem",
            fontWeight: "550",
          }}
        >
          new club added!
        </h1>
      </div>
      <div
        style={{
          color: "#087DF1",
          fontFamily: "Montserrat",
          fontStyle: "bold",
          width: "20rem",
        }}
      >
        your club <span style={{ fontWeight: "bold" }}>'{clubName}'</span> has
        been successfully created and added to your user account.
      </div>
      <div className={styles.body} style={{ alignItems: "center" }}></div>
      <Button
        buttonText="confirm"
        onClick={handleOnClick}
        width="10rem"
        height="4rem"
        fontSize="1.5rem"
      />
    </div>
  );
};

export default NewClubAdded;
