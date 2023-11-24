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
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getTextColor } from "../../utils/helpers";
import IColumn from "../../types/IColumn";
import axios from "axios";
import { TickCircle, CloseCircle, InfoCircle } from "iconsax-react";
import { useNavigate, useParams } from "react-router";
import SadFace from "../../assets/SadFace.svg";
import DeadFace from "../../assets/DeadFace.svg";
import CircularProgress from "@mui/material/CircularProgress";

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
  webLink?: string;
  font?: string; // just for title
  // bodyfont?

  // images
  optionsList: IColumn[]; // first column object is the default option
  clubLogoUrl?: string;
  backgroundImageUrl?: string;

  isOnboarding: boolean;
}

const ClubCheckerPage = ({
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
  optionsList = [{ originalName: "column1", displayName: "upi" }],
  isOnboarding,
  webLink,
}: ClubCheckerPageProps) => {
  // document.body.style.backgroundColor = backgroundColor || "white";

  const navigate = useNavigate();
  const textFieldLabelRef = useRef<HTMLInputElement>(null);

  const [selectedIdentifier, setSelectedIdentifier] = useState<IColumn>(
    optionsList[0]
  );

  useEffect(() => {
    // Update selectedIdentifier when optionsList changes
    setSelectedIdentifier(optionsList[0]); // You can choose how to set selectedIdentifier here based on your requirements
  }, [optionsList]); // This dependency array specifies that the effect should run whenever optionsList changes

  const [textFieldWidth, setTextFieldWidth] = useState(0);
  const textFieldRef = createRef();

  useLayoutEffect(() => {
    setTextFieldWidth(textFieldLabelRef.current?.offsetWidth || 0);
  });

  useEffect(() => {
    if (isOnboarding) return;
    axios.get(`/pages/info/${webLink}`).catch((err) => {
      if (err.response.status === 400) {
        navigate("/");
      }
    });
  }, []);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [iconState, setIconState] = useState(0);

  const iconStyle = {
    color: textFieldTextColor,
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onCheck();
    }
  };

  const onCheck = async () => {
    const input = (textFieldRef.current as HTMLInputElement).value;
    // check if input is empty
    if (!input || input.trim().length == 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setLoading(true);
    try {
      const response = await axios.get(
        `/pages/verify/${webLink}/${selectedIdentifier.displayName}/${input}`
      );
      if (response.data == "value found in column") {
        setIsSuccess("You are already a member of this club!");
        setIconState(1);
      } else {
        setIsSuccess("You are not currently a member of this club!");
        setIconState(2);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(
        "oops! there was an error - please refresh the page and try again."
      );
      setIconState(3);
    } finally {
      setLoading(false);
    }
  };
  const handleFocus = () => {
    setIconState(0);
  };

  return selectedIdentifier ? (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: backgroundColor,
        borderRadius: isOnboarding ? "20px" : "0px",
      }}
    >
      {clubLogoUrl && <img className={styles.logo} src={clubLogoUrl} />}
      <h1
        style={{
          color: titleTextColor,
          font: `bold 56px "${font}"`,
          textAlign: "center",
          minHeight: "45px",
          maxWidth: "95%",
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
          width: "160px",
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
          {optionsList[0].displayName}
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
            fontWeight: "900",
            left: "10px",
            top: "13px",
            position: "absolute",
            zIndex: "1",
            fontFamily: font,
          }}
          ref={textFieldLabelRef}
        >
          {selectedIdentifier.displayName}
        </p>
        <Textfield
          backgroundColor={textFieldBackgroundColor}
          isError={isError}
          errorText={`Please enter a ${selectedIdentifier.displayName}`}
          height="50px"
          width="275px"
          padding={`0px 0px 0px ${textFieldWidth + 18}px`}
          placeholder={
            `please enter your ${selectedIdentifier.displayName}` ||
            "no identifier selected yet"
          }
          textColour={textFieldTextColor}
          ref={textFieldRef}
          fontFamily={font}
          onKeyDown={handleEnterKey}
          onFocus={handleFocus}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: 'center',
          height: "25vh",
        }}
      >
        {iconState === 0 && (
          <Button
            buttonText="check"
            backgroundColor={buttonBackgroundColor}
            onClick={() => !isOnboarding && onCheck()}
            width="9rem"
            height="3.25rem"
            fontSize="1rem"
            isLoading={loading}
            fontFamily={font}
            color="#FFFFFF"
          />
        )}
        {iconState !== 0 && (
          <div className={styles.result}>
            {iconState === 1 && <TickCircle size="95" style={iconStyle} />}
            {iconState === 2 && <CloseCircle size="95" style={iconStyle} />}
            {iconState === 3 && <InfoCircle size="95" style={iconStyle} />}
            {isSuccess && (
              <p
                style={{
                  fontFamily: font,
                  fontSize: "1.5rem",
                  width: "300px",
                  color: textFieldTextColor,
                }}
              >
                {isSuccess}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.loading}>
      <CircularProgress
        className={styles.loadingContainer}
        sx={{
          color: "#183249",
        }}
        size={175}
        thickness={3}
      />
    </div>
  );
};

export default ClubCheckerPage;
