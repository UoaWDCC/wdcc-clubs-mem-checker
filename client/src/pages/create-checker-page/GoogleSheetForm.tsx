import axios from 'axios';
import {
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import LinkIcon from '../../assets/LinkIcon.svg';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Textfield from '../../components/Textfield';
import IPage from '../../types/IPage';
import { IClubDetails } from '../club-detail-page/ClubDetailPage';
import { PageContextProvider } from './EditCheckerPage';

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
  console.log("link: ", link);
  const regex = /#gid=(\w+)/;
  const linkArray = link.split('/');
  console.log(linkArray);
  const gidIndex = linkArray.findIndex((part) =>
    part.toLowerCase().includes('#gid=')
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
    console.log("page", page);
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
      console.log("link2", link);
      console.log("sheet id", spreadsheetId);
      console.log("tab id", sheetTabId);
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
          console.log("res.data", response.data);
          setPage({
            ...page,
            googleSheetLink: link,
            identificationColumns: response.data,
          });
          onNext();
        })
        .catch((error) => {
          console.log("Error fetching spreadsheet columns:", error);
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
        <i className="text-xl text-[#087DF1] text-center">
          Copy the URL in the address bar, e.g.
          <br />
          https://docs.google.com/spreadsheets/d/1MiVgLAC-NtHL_rARZeR1uPx04gEY-QRJzSu76xI8UvI/edit?gid=0#gid=0
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
