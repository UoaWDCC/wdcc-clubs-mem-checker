/*
Component takes as props: Club ID, Club name, theme colours, club logo URL, options list, default option, isOnboarding
 Users can see the name and logo of the club
 Before logo is set, logo area should have an 'empty logo display'
 Users are presented with the default identification option (indicated in the dropdown and textfield label)
 Users can select another identification option from the dropdown to instantly update textfield label
 Users can type their info into the textfield
 If prop isOnboarding is true, check button is disabled
 Otherwise, users can click a check button to enter their info
 Users are presented with an error message if no info has been entered into the textfield/*/

import Button from "../../components/Button";
import Textfield from "../../components/Textfield";
import WdccLogo from "../../assets/WdccLogo.svg";
import styles from "./ClubCheckerPage.module.css";

interface ClubCheckerPageProps {
  clubId: number;
  clubName: string;
  // colors
  backgroundColor: string;
  titleTextColor: string;
  textFieldBackgroundColor: string;
  textFieldTextColor: string;
  buttonBackgroundColor: string;
  dropDownBackgroundColor: string;

  // images
  clubLogoUrl: string;
  backgroundImageUrl: string;
  optionsList: string[]; // correct type???
  // defaultOption: string;
  isOnboarding: boolean;
}

const ClubCheckerPage = ({
  clubId,
  clubName,
  // colors
  backgroundColor,
  titleTextColor,
  textFieldBackgroundColor,
  textFieldTextColor,
  buttonBackgroundColor,
  dropDownBackgroundColor,
  clubLogoUrl,
  backgroundImageUrl,
  optionsList,
  isOnboarding,
}: ClubCheckerPageProps) => {
  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <img style={{}} className={styles.logo} src={WdccLogo} />
      <h1
        style={{ color: titleTextColor }}
      >{`${clubName} Membership Checker`}</h1>
      <select
        style={{
          backgroundColor: dropDownBackgroundColor,
          borderRadius: "8px",
          height: "25px",
          width: "180px",
          color: "#ECECEC",
        }}
        defaultValue={""}
      >
        <option value="" disabled hidden>
          Select identifier
        </option>
        {optionsList.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Textfield
        placeholder="upi e.g. vraj752"
        backgroundColor={textFieldBackgroundColor}
        height="45px"
        textColour={textFieldTextColor}
        width="220px"
      />
      <Button
        buttonText="check"
        backgroundColor={buttonBackgroundColor}
        onClick={() => !isOnboarding && console.log("checking")}
        width="160px"
      />
    </div>
  );
};

export default ClubCheckerPage;
