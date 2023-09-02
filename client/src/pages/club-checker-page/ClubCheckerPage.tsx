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
import { createRef, useLayoutEffect, useRef, useState, useEffect } from "react";
import { getTextColor } from "../../utils/helpers";
import Column from "../../types/Column";
import axios from "axios";
import { CheckerPageProps } from "../../../../api/routes/pages/pages"

export interface ClubCheckerPageProps {
  pageProps: CheckerPageProps;
  webLink: string;
}

const ClubCheckerPage = () => {
  const [pageData, setPageData] = useState<ClubCheckerPageProps>();

  useEffect(() => {
    axios
      .get(`/pages/info/${pageData?.webLink}`)
      .then((response) => {
        setPageData({
          ...pageData,
          pageProps: response,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  
  //document.body.style.backgroundColor = backgroundColor || "white";

  const textFieldLabelRef = useRef<HTMLInputElement>(null);

  const [selectedIdentifier, setSelectedIdentifier] = useState<Column>(
    pageData.pageProps.columns[0]
  );

  const isOnboarding = false;

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
        backgroundImage: pageData?.pageProps.backgroundImageLink,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: pageData?.pageProps.backgroundColor,
        borderRadius: isOnboarding ? "20px" : "0px",
      }}
    >
      {pageData?.pageProps.logoLink && (
        <img className={styles.logo} src={pageData?.pageProps.logoLink} />
      )}
      <h1
        style={{
          color: pageData?.pageProps.headingColor,
          font: `bold 36px "${pageData?.pageProps.fontFamily}"`,
          textAlign: "center",
          minHeight: "45px",
          maxWidth: "100%",
          overflowWrap: "break-word",
        }}
      >
        {pageData?.pageProps.title}
      </h1>
      <select
        style={{
          backgroundColor: pageData?.pageProps.textFieldBackgroundColor,
          borderRadius: "8px",
          height: "30px",
          width: "180px",
          color: getTextColor(pageData?.pageProps.textFieldBackgroundColor),
        }}
        value={""}
        onChange={(event) => {
          const originalName = event.target.value;
          const columnObject = pageData?.pageProps.columns.find(
            (column) => column.originalName === originalName
          );
          if (!columnObject) return;
          setSelectedIdentifier(columnObject);
        }}
      >
        <option value="" disabled hidden>
          Select identifier
        </option>
        {pageData?.pageProps.columns.map((option) => (
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
            color: pageData?.pageProps.textColor,
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
          backgroundColor={pageData?.pageProps.textFieldBackgroundColor}
          isError={isError}
          errorText={`Please enter a ${selectedIdentifier.displayName}`}
          height="45px"
          padding={`0px 0px 0px ${textFieldWidth + 18}px`}
          placeholder={
            `please enter your ${selectedIdentifier.displayName}` ||
            "no identifier selected yet"
          }
          textColour={pageData?.pageProps.textColor}
          ref={textFieldRef}
          width="330px"
        />
      </div>
      <Button
        buttonText="check"
        backgroundColor={pageData?.pageProps.buttonColor}
        onClick={() => !isOnboarding && onCheck()}
        width="160px"
        padding="12px 0px"
      />
    </div>
  );
};

export default ClubCheckerPage;
