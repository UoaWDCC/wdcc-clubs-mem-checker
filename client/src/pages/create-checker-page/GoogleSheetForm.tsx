import styles from './style.module.css';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import {
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import LinkIcon from '../../assets/LinkIcon.svg';
import axios from 'axios';
import { useLocation } from 'react-router';
import { IClubDetails } from '../club-detail-page/ClubDetailPage';
import BackButton from '../../components/BackButton';

interface GoogleSheetFormProps {
  onNext: () => void;
  onBack: () => void;
}

export const getSpreadsheetId = (link: string): string | null => {
  const linkArray = link.split('/');
  const idIndex =
    linkArray.findIndex((value) => value.toLowerCase() == 'd') + 1;
  return linkArray[idIndex];
};

export const getSheetTabId = (link: string): string | null => {
  const regex = /#gid=(\w+)/;
  const linkArray = link.split('/');
  const gidIndex = linkArray.findIndex((value) =>
    value.toLowerCase().startsWith('#gid=', 0)
  );
  if (gidIndex === -1) return null;
  const match = linkArray[gidIndex].match(regex);
  return match ? match[1] : null;
};

export var spreadsheetColumns = {};

const GoogleSheetForm = ({ onNext, onBack }: GoogleSheetFormProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];

  const clubDetails = useLocation().state as IClubDetails;

  const [isError, setIsError] = useState<boolean>(false);
  const linkRegex = new RegExp(
    '^(?:https?://)?docs.google.com/spreadsheets/d/[a-zA-Z0-9-_]',
    'i'
  );

  const inputRef = createRef();
  useEffect(() => {
    console.log(page);
    (inputRef.current as HTMLInputElement).setAttribute(
      'value',
      page.googleSheetLink || ''
    );
  }, [page.googleSheetLink]);

  const isLinkValid = (link: string): boolean => {
    // if (linkRegex.test(link)) {
    // setIsError(false);
    // return true;
    // }
    // setIsError(true);
    // return false;
    setIsError(false);
    return true; // All links are valid temporarily
  };

  const handleOnNext = () => {
    setIsLoading(true);
    const link = (inputRef.current as HTMLInputElement).value;
    if (isLinkValid(link)) {
      setPage({
        ...page,
        googleSheetLink: link,
      });
      // --------------get spreadsheetId and sheetTabId
      const spreadsheetId = getSpreadsheetId(link);
      const sheetTabId = getSheetTabId(link);
      if (!spreadsheetId || !sheetTabId) {
        setIsError(true);
        (inputRef.current as HTMLInputElement).focus();
        return;
      }
      // --------------try fetch spreadsheet columns
      axios
        .get(`/sheet/columns/${spreadsheetId}/${sheetTabId}`)
        .then((response) => {
          spreadsheetColumns = response.data;
          console.log(response.data);
          setPage({
            ...page,
            googleSheetLink: link,
            identificationColumns: response.data,
          });
          onNext();
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      (inputRef.current as HTMLInputElement).focus();
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center md:bg-[#fff] font-display pt-8 justify-top md:justify-between gap-10 md:gap-16 p-0 bg-[transparent] md:px-10 md:py-16 rounded-xl w-fit shadow-lg">
        <div className="flex flex-col md:flex-row w-full justify-center">
          <span className="float-left">
            <BackButton
              onClick={onBack}
              color="#087DF1"
              size="40px"
              hoverColor="#cceeff"
              backgroundColor="transparent"
            />
          </span>
          <div className="w-full flex text-2xl text-[#087df1] md:pt-[2vh] justify-center items-center gap-1 md:gap-4 flex-row">
            <h1 className="font-display font-bold">link your google sheet</h1>
            <img
              className="w-14"
              src={GoogleSheetsLogo}
            />
          </div>
        </div>
        <i className="text-xl text-[#087DF1]">
          (paste the link to the google sheet with membership data)
        </i>
        <div className="">
          <Textfield
            errorText="enter valid link"
            fontSize="1rem"
            height="45px"
            icon={LinkIcon}
            isError={isError}
            placeholder={'paste link here'}
            ref={inputRef}
            width="100%"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-lg text-[#707070] mt-1 max-w-[60%] text-center">
            If you have more than one google sheet (e.g. for different years),
            you can create more membership checker pages for your club later in
            the admin dashboard.
          </p>
        </div>
        <Button
          buttonText="next"
          height="40px"
          onClick={handleOnNext}
          fontSize="14px"
          width="80px"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GoogleSheetForm;
