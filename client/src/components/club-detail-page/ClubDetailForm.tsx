import styles from "./style.module.css";
import BackArrow from "../../assets/BackArrow.svg";
import { useRef, useState } from "react";
import Textfield from "../Textfield";
import Button from "../Button";
import { ClubDetails } from "./ClubDetailPage";
import axios from "axios";

const url = "localhost:3000/club/create"; //temp url
const bearerToken = import.meta.env.VITE_BEARER_TOKEN as string; //Create a .env file in the root directory of client and add VITE_BEARER_TOKEN=your_token_here
axios.defaults.headers.post["Authorization"] = `Bearer ${bearerToken}`;

interface ClubDetailFormProps {
  onNext: (clubDetails: ClubDetails) => void;
}

const ClubDetailForm = ({ onNext }: ClubDetailFormProps) => {
  const clubNameRef = useRef<HTMLInputElement>(null);
  const clubAcronymRef = useRef<HTMLInputElement>(null);
  const [clubNameError, setClubNameError] = useState(false);
  const [clubAcronymError, setClubAcronymError] = useState(false);

  const handleOnClick = () => {
    console.log(clubNameRef.current?.value);
    if (clubNameRef.current?.value === "") {
      setClubNameError(true);
    }
    if (clubAcronymRef.current?.value === "") {
      setClubAcronymError(true);
    }
    if (
      clubNameRef.current?.value !== "" &&
      clubAcronymRef.current?.value !== ""
    ) {
      axios
        .post(url, {
          clubName: clubNameRef.current?.value,
          clubAcronym: clubAcronymRef.current?.value,
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            onNext({
              clubName: clubNameRef.current?.value!,
              clubAcronym: clubAcronymRef.current?.value!,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleOnBack = () => {};

  return (
    <div className={styles.container}>
      <div id={styles.backButton}>
        <Button
          buttonText=""
          icon={BackArrow}
          onClick={handleOnBack}
          width="55px"
          height="55px"
          backgroundColor="transparent"
          border="#087DF1 solid 4px"
          hoverColor="#cceeff"
          iconSize="auto"
          borderRadius="15px"
        />
      </div>
      <div>
        <div>
          <h1 id={styles.title}>club details</h1>
        </div>
        <div id={styles.description}>
          please fill out your club details to enter you club into our system
        </div>
      </div>
      <div>
        <Textfield
          margin="2rem 2rem 2rem 2rem"
          width="20rem"
          height="4rem"
          fontSize="1.5rem"
          placeholder="club name"
          ref={clubNameRef}
          onChange={() => setClubNameError(false)}
          isError={clubNameError}
          errorText="enter club name"
        />
        <Textfield
          margin="2rem"
          width="20rem"
          height="4rem"
          fontSize="1.5rem"
          placeholder="club acronym"
          ref={clubAcronymRef}
          onChange={() => setClubAcronymError(false)}
          isError={clubAcronymError}
          errorText="enter club acronym"
        />
      </div>
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

export default ClubDetailForm;
