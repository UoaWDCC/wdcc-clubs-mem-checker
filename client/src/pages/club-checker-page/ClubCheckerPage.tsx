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
import {
  InputHTMLAttributes,
  ReactElement,
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTextColor } from '../../utils/helpers';
import IColumn from '../../types/IColumn';
import axios from 'axios';
import { TickCircle, CloseCircle, InfoCircle } from 'iconsax-react';
import { useNavigate, useParams } from 'react-router';
import SadFace from '../../assets/SadFace.svg';
import DeadFace from '../../assets/DeadFace.svg';
import CircularProgress from '@mui/material/CircularProgress';
import WebFont from 'webfontloader';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

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
  useEffect(() => {
    WebFont.load({
      google: {
        families: [font],
      },
    });
  }, [font]);
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
  const textFieldRef = createRef<any>();

  useLayoutEffect(() => {
    setTextFieldWidth(textFieldLabelRef.current?.offsetWidth || 0);
  });

  useEffect(() => {
    if (isOnboarding) return;
    axios.get(`/pages/info/${webLink}`).catch((err) => {
      if (err.response.status === 400) {
        navigate('/');
      }
    });
  }, []);
  useEffect(() => {
    try {
      textFieldRef.current.value = '';
    } catch {}
  }, [selectedIdentifier]);

  const backgroundImageBlob = useMemo(() => {
    try {
      return (
        backgroundImageUrl &&
        // @ts-ignore
        URL.createObjectURL(page.backgroundImageUrl)
      );
    } catch {
      return backgroundImageUrl;
    }
  }, [backgroundImageUrl]);
  const logoImageBlob = useMemo(() => {
    try {
      return (
        clubLogoUrl &&
        // @ts-ignore
        URL.createObjectURL(clubLogoUrl)
      );
    } catch {
      return clubLogoUrl;
    }
  }, [clubLogoUrl]);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [iconState, setIconState] = useState(0);

  const iconStyle = {
    color: textFieldTextColor,
  };

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
        `/verify/${webLink}/${selectedIdentifier.displayName}/${input}`
      );
      if (response.data == 'value found in column') {
        setIsSuccess('You are already a member of this club!');
        setIconState(1);
      } else {
        setIsSuccess('You are not currently a member of this club!');
        setIconState(2);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(
        'oops! there was an error - please refresh the page and try again.'
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
      className="flex flex-col items-center w-full justify-center py-16 gap-6 h-full rounded-xl"
      style={{
        backgroundImage: backgroundImageBlob
          ? `url(${backgroundImageBlob})`
          : '',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: backgroundColor,
        borderRadius: isOnboarding ? '20px' : '0px',
      }}
    >
      {logoImageBlob && (
        <img
          className="float-right absolute top-[15px] right-[15px]"
          width={96}
          src={logoImageBlob}
        />
      )}
      <h1
        className="font-bold text-5xl text-ellipsis text-center p-8"
        style={{
          color: titleTextColor,
          fontFamily: font,
        }}
      >
        {title}
      </h1>
      <select
        className="h-[30px] w-[160px] rounded-xl"
        style={{
          backgroundColor: dropDownBackgroundColor,
          color: getTextColor(dropDownBackgroundColor),
        }}
        value={selectedIdentifier.displayName}
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
          {optionsList[0].displayName}
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
      <div className="flex">
        <Textfield
          backgroundColor={textFieldBackgroundColor}
          isError={isError}
          errorText={`Please enter a ${selectedIdentifier.displayName}`}
          height="50px"
          width="275px"
          padding={`0px 0px 0px ${textFieldWidth + 18}px`}
          placeholder={
            `please enter your ${selectedIdentifier.displayName}` ||
            'no identifier selected yet'
          }
          textColour={textFieldTextColor}
          ref={textFieldRef}
          fontFamily={font}
          onKeyDown={handleEnterKey}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex justify-center h-[10rem]">
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
            {iconState === 1 && (
              <TickCircle
                size="95"
                style={iconStyle}
              />
            )}
            {iconState === 2 && (
              <CloseCircle
                size="95"
                style={iconStyle}
              />
            )}
            {iconState === 3 && (
              <InfoCircle
                size="95"
                style={iconStyle}
              />
            )}
            {isSuccess && (
              <p
                className="text-xl"
                style={{
                  fontFamily: font,
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
          color: '#183249',
        }}
        size={175}
        thickness={3}
      />
    </div>
  );
};

export default ClubCheckerPage;
