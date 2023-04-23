import styles from "./CreateClub.module.css";
import Background from "../Background";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateClub = () => {
  const [created, setCreated] = useState(false);
  const [clubName, setClubName] = useState();
  const [clubAcronym, setClubAcronym] = useState();

  const navigate = useNavigate();

  return (
    <Background>
      {!created ? (
        <div className={styles.container}>
          <div>
            <h1>club details</h1>
            <i>
              please fill out your club details to enter your club into our
              system
            </i>
          </div>
          <div className={styles.body}>
            <input type="text" placeholder="club name" />
            <input type="text" placeholder="club acronym" />
          </div>
          <div>
            <button onClick={() => setCreated(true)}>Confirm</button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div>
            <h1>new club added!</h1>
          </div>
          <div className={styles.body}>
            <p>
              your club <b>{`<club name>`}</b> has been succesfully created and
              added to your user account.
            </p>
          </div>
          <div>
            <i>
              please proceed to creating a new membership checker page for
              {`<club acronym>`}
            </i>
          </div>
          <button
            id={styles.nextButton}
            onClick={() => navigate("/createCheckerPage")}
          >
            Next
          </button>
        </div>
      )}
    </Background>
  );
};

export default CreateClub;
