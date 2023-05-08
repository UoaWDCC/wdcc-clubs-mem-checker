import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./ClubDetailPage";
import Textfield from "../Textfield";
import Button from "../Button";

interface ColumnSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

const handleOnClick = () => {};
const handleOnBack = () => {};

const ClubDetailForm = ({ onNext, onBack }: ColumnSelectorProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

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
        />
        <Textfield
          margin="2rem"
          width="20rem"
          height="4rem"
          fontSize="1.5rem"
          placeholder="club acronym"
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
