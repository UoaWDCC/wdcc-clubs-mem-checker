import styles from "./style.module.css";
import { BackSquare } from "iconsax-react";
import { useRef, useState } from "react";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { IClubDetails } from "./ClubDetailPage";
import axios from "axios";
import { useNavigate } from "react-router";

const url = "/club/create"; //temp url

interface ClubDetailFormProps {
  onNext: (clubDetails: IClubDetails) => void;
}

const ClubDetailForm = ({ onNext }: ClubDetailFormProps) => {
  const navigate = useNavigate();
  const clubNameRef = useRef<HTMLInputElement>(null);
  const clubAcronymRef = useRef<HTMLInputElement>(null);
  const [clubNameError, setClubNameError] = useState(false);
  const [clubAcronymError, setClubAcronymError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clubNameErrorMessage, setClubNameErrorMessage] =
    useState("enter club name");

  const handleOnClick = () => {
    if (clubNameRef.current?.value === "") {
      setClubNameErrorMessage("enter club name");
      setClubNameError(true);
    }
    if (clubAcronymRef.current?.value === "") {
      setClubAcronymError(true);
    }
    if (
      clubNameRef.current?.value !== "" &&
      clubAcronymRef.current?.value !== ""
    ) {
      setIsLoading(true);
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
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          setClubNameErrorMessage("the club you want to create already exists");
          setClubNameError(true);
          setIsLoading(false);
        });
    }
  };
  const handleOnBack = () => {
    navigate("/no-clubs");
  };

  return (
    <div className={styles.container}>
      <div id={styles.backButton}>
        {/* <Button buttonText="" onClick={handleOnBack} iconFromIconsax={<BackSquare/>} iconSize="50px" height="45px" width="45px" backgroundColor="transparent" margin="0 500px 0 0" color="#087DF1" hoverColor="#cceeff" padding="0px" borderRadius="20px" translateX="-2.5px" translateY="-2.5px"
          /> */}
        <BackButton
          onClick={handleOnBack}
          size="42px"
          backgroundColor="transparent"
          color="#087DF1"
          hoverColor="#cceeff"
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
          margin="1rem 0rem -2rem 2rem"
          padding="0 1rem"
          width="20rem"
          height="4rem"
          fontSize="1.3rem"
          fontWeight="500"
          placeholder="club name"
          ref={clubNameRef}
          onChange={() => setClubNameError(false)}
          isError={clubNameError}
          errorText={clubNameErrorMessage}
        />
        <Textfield
          margin="2rem 2rem 0rem 2rem"
          padding="0 1rem"
          width="20rem"
          height="4rem"
          fontSize="1.3rem"
          fontWeight="500"
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
        fontSize="1.3rem"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ClubDetailForm;
