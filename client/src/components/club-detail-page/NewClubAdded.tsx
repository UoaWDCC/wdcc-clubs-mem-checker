import Button from "../Button";
import styles from "./style.module.css";
import { ClubDetails } from "./ClubDetailPage";

interface NewClubAddedProps {
  clubDetails: ClubDetails;
}

const NewClubAdded = ({ clubDetails }: NewClubAddedProps) => {
  const handleOnClick = () => {
    console.log("done");
  };
  return (
    <div className={styles.container}>
      <div id={styles.backButton}></div>
      <div>
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "550",
          }}
        >
          new club added!
        </h1>
      </div>
      <div
        style={{
          fontStyle: "bold",
          fontSize: "1.5rem",
          width: "20rem",
        }}
      >
        your club{" "}
        <span style={{ fontWeight: "bold" }}>'{clubDetails.clubName}'</span> has
        been successfully created and added to your user account.
      </div>
      <div className={styles.body} style={{ alignItems: "center" }}></div>
      <div>
        <div
          style={{
            width: "70%",
            margin: "auto",
          }}
        >
          please proceed to creating a membership checker page for{" "}
          {clubDetails.clubAcronym}
        </div>
        <Button
          buttonText="next"
          onClick={handleOnClick}
          width="10rem"
          height="4rem"
          fontSize="1.5rem"
          margin="2rem 0 0 0"
        />
      </div>
    </div>
  );
};

export default NewClubAdded;
