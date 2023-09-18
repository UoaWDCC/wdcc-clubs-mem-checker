import Button from "../../components/Button";
import styles from "./style.module.css";
import { IClubDetails } from "./ClubDetailPage";
import { useNavigate } from "react-router";

interface NewClubAddedProps {
  clubDetails: IClubDetails;
}

const NewClubAdded = ({ clubDetails }: NewClubAddedProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/create-page", { state: clubDetails });
  };
  return (
    <div className={styles.container}>
      <div id={styles.backButton}></div>
      <div>
        <h1 id={styles.title}>new club added!</h1>
      </div>
      <div id={styles.message}>
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
