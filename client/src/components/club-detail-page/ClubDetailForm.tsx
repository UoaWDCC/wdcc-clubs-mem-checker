import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { useContext, Dispatch, SetStateAction, useRef, useState } from "react";
import Textfield from "../Textfield";
import Button from "../Button";

interface ClubDetailFormProps {
  onNext: (clubName: string) => void;
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
      onNext(clubNameRef.current?.value!);
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
          <h1
            style={{
              color: "#087DF1",
              fontFamily: "Montserrat",
              fontSize: "3rem",
              fontWeight: "550",
            }}
          >
            club details
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
          please fill out your club details to enter you club into our system
        </div>
      </div>
      <div className={styles.body} style={{ alignItems: "center" }}>
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
