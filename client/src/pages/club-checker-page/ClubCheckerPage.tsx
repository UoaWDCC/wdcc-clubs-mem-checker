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

import Button from '../../components/Button';
import Textfield from '../../components/Textfield';
import styles from './ClubCheckerPage.module.css';
import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getTextColor } from '../../utils/helpers';
import IColumn from '../../types/IColumn';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

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
  title = 'No title selected',
  // colors
  backgroundColor = '#ECECEC',
  titleTextColor = '#000000',
  textFieldBackgroundColor = '#E0E0E0',
  textFieldTextColor = '#000000',
  buttonBackgroundColor = '#C1C1C2',
  dropDownBackgroundColor = '#4F4F4F',
  font = 'Montserrat',
  clubLogoUrl,
  backgroundImageUrl,
  optionsList = [{ originalName: 'column1', displayName: 'upi' }],
  isOnboarding,
  webLink,
}: ClubCheckerPageProps) => {
  // document.body.style.backgroundColor = backgroundColor || "white";

  const { webLinkID } = useParams();

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
    axios.get(`/pages/info/${webLinkID}`).catch((err) => {
      if (err.response.status === 400) {
        navigate("/");
      }
    });
  }, []);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
      if (response.data == 'value found in column') {
        setIsSuccess('You are part of this club!');
      } else {
        setIsSuccess('You are not part of this club!');
      }
    } catch (error) {
      console.error(error);
      setIsSuccess('An error occurred while making the request');
    } finally {
      setLoading(false);
    }
  };

  return selectedIdentifier ? (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImageUrl ? backgroundImageUrl : '',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: backgroundColor,
        borderRadius: isOnboarding ? '20px' : '0px',
      }}
    >
      {clubLogoUrl && (
        <img
          className={styles.logo}
          src={clubLogoUrl}
        />
      )}
      <h1
        style={{
          color: titleTextColor,
          font: `bold 36px "${font}"`,
          textAlign: 'center',
          minHeight: '45px',
          maxWidth: '100%',
          overflowWrap: 'break-word',
        }}
      >
        {title}
      </h1>
      <select
        style={{
          backgroundColor: dropDownBackgroundColor,
          borderRadius: '8px',
          height: '30px',
          width: '180px',
          color: getTextColor(dropDownBackgroundColor),
        }}
        value={''}
        onChange={(event) => {
          const originalName = event.target.value;
          const columnObject = optionsList.find(
            (column) => column.originalName === originalName
          );
          if (!columnObject) return;
          setSelectedIdentifier(columnObject);
        }}
      >
        <option
          value=""
          disabled
          hidden
        >
          Select identifier
        </option>
        {optionsList.map((option) => (
          <option
            key={option.originalName}
            value={option.originalName}
          >
            {option.displayName}
          </option>
        ))}
      </select>
      <div
        style={{
          display: 'flex',
          height: '45px',
          margin: '-30px 0px 0px 0px',
          position: 'relative',
        }}
      >
        <p
          style={{
            alignSelf: 'center',
            color: textFieldTextColor,
            display: 'flex',
            fontWeight: 'bold',
            left: '10px',
            top: '9px',
            position: 'absolute',
            zIndex: '1',
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
            'no identifier selected yet'
          }
          textColour={textFieldTextColor}
          ref={textFieldRef}
          width="330px"
          onKeyDown={handleEnterKey}
        />
      </div>
      <Button
        buttonText="check"
        backgroundColor={buttonBackgroundColor}
        onClick={() => !isOnboarding && onCheck()}
        width="160px"
        padding="12px 0px"
      />
      <div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress
              className={styles.loadingContainer}
              sx={{
                color: '#000000',
              }}
              size={24}
              thickness={3}
            />
          </div>
        ) : (
          isSuccess && (
            <p
              style={{
                fontFamily: 'montserrat',
              }}
            >
              {isSuccess}
            </p>
          )
        )}
      </div>
    </div>
  ) : (
    <>Loading Icon Here</>
  );
};

export default ClubCheckerPage;
