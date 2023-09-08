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
import styles from "./ClubCheckerPage.module.css";
import { createRef, useLayoutEffect, useRef, useState } from "react";
import { getTextColor } from "../../utils/helpers";
import IColumn from "../../types/IColumn";

interface ClubCheckerPageProps {
  clubId?: number;
  clubName?: string;
  title?: string;
  // colors
  backgroundColor?: string;
  titleTextColor?: string;
  textFieldBackgroundColor?: string;
  textFieldTextColor?: string;
  buttonBackgroundColor?: string;
  dropDownBackgroundColor?: string;

  font?: string; // just for title
  // bodyfont?

  // images
  clubLogoUrl?: File;
  backgroundImageUrl?: File;
  optionsList: IColumn[]; // first column object is the default option
  // defaultOption: string;
  isOnboarding: boolean;
}

const ClubCheckerPage = ({
  clubId,
  clubName,
  title = "No title selected",
  // colors
  backgroundColor = "#ECECEC",
  titleTextColor = "#000000",
  textFieldBackgroundColor = "#E0E0E0",
  textFieldTextColor = "#000000",
  buttonBackgroundColor = "#C1C1C2",
  dropDownBackgroundColor = "#4F4F4F",
  font = "Montserrat",
  clubLogoUrl,
  backgroundImageUrl,
  optionsList,
  isOnboarding,
}: ClubCheckerPageProps) => {
  // document.body.style.backgroundColor = backgroundColor || "white";

  const textFieldLabelRef = useRef<HTMLInputElement>(null);

  const [selectedIdentifier, setSelectedIdentifier] = useState<IColumn>(
    optionsList[0]
  );

  const [textFieldWidth, setTextFieldWidth] = useState(0);
  const textFieldRef = createRef();

  useLayoutEffect(() => {
    setTextFieldWidth(textFieldLabelRef.current?.offsetWidth || 0);
  });

  const [isError, setIsError] = useState<boolean>(false);
  const onCheck = () => {
    const input = (textFieldRef.current as HTMLInputElement).value;
    // check if input is empty
    if (!input || input.trim().length == 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${URL.createObjectURL(backgroundImageUrl)})`
          : "",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: backgroundColor,
        borderRadius: isOnboarding ? "20px" : "0px",
      }}
    >
      {clubLogoUrl && (
        <img className={styles.logo} src={URL.createObjectURL(clubLogoUrl)} />
      )}
      <h1
        style={{
          color: titleTextColor,
          font: `bold 36px "${font}"`,
          textAlign: "center",
          minHeight: "45px",
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </h1>
      <select
        style={{
          backgroundColor: dropDownBackgroundColor,
          borderRadius: "8px",
          height: "30px",
          width: "180px",
          color: getTextColor(dropDownBackgroundColor),
        }}
        value={""}
        onChange={(event) => {
          const originalName = event.target.value;
          const columnObject = optionsList.find(
            (column) => column.originalName === originalName
          );
          if (!columnObject) return;
          setSelectedIdentifier(columnObject);
        }}
      >
        <option value="" disabled hidden>
          Select identifier
        </option>
        {optionsList.map((option) => (
          <option key={option.originalName} value={option.originalName}>
            {option.displayName}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          height: "45px",
          margin: "-30px 0px 0px 0px",
          position: "relative",
        }}
      >
        <p
          style={{
            alignSelf: "center",
            color: textFieldTextColor,
            display: "flex",
            fontWeight: "bold",
            left: "10px",
            top: "9px",
            position: "absolute",
            zIndex: "1",
          }}
          ref={textFieldLabelRef}
        >
          {selectedIdentifier.displayName}
        </p>
        <Textfield
          backgroundColor={textFieldBackgroundColor}
          isError={isError}
          errorText={`Please enter a ${selectedIdentifier.displayName}`}
          height="45px"
          padding={`0px 0px 0px ${textFieldWidth + 18}px`}
          placeholder={
            `please enter your ${selectedIdentifier.displayName}` ||
            "no identifier selected yet"
          }
          textColour={textFieldTextColor}
          ref={textFieldRef}
          width="330px"
        />
      </div>
      <Button
        buttonText="check"
        backgroundColor={buttonBackgroundColor}
        onClick={() => !isOnboarding && onCheck()}
        width="160px"
        padding="12px 0px"
      />
    </div>
  );
};

export default ClubCheckerPage;
