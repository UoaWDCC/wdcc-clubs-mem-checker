import styles from './style.module.css';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import {
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import LinkIcon from "../../assets/LinkIcon.svg";
import axios from "axios";
import { useLocation } from "react-router";
import { IClubDetails } from "../club-detail-page/ClubDetailPage";
import BackButton from "../../components/BackButton";

interface GoogleSheetFormProps {
  onNext: () => void;
  showInstructions: () => void;
  hasShowedInstructions: boolean;
}

export const getSpreadsheetId = (link: string): string | null => {
  const linkArray = link.split('/');
  const idIndex =
    linkArray.findIndex((value) => value.toLowerCase() == 'd') + 1;
  return linkArray[idIndex];
};

export const getSheetTabId = (link: string): string | null => {
  const regex = /edit#gid=(\w+)/;
  const linkArray = link.split('/');
  const gidIndex = linkArray.findIndex((value) =>
    value.toLowerCase().startsWith('edit#gid=', 0)
  );
  if (gidIndex === -1) return null;
  const match = linkArray[gidIndex].match(regex);
  return match ? match[1] : null;
};

export var spreadsheetColumns = {};

const GoogleSheetForm = ({ onNext, showInstructions, hasShowedInstructions }: GoogleSheetFormProps) => {
  const [instructionPageBool, setInstructionPageBool] = useState(hasShowedInstructions);
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
    if (instructionPageBool === false){
      (inputRef.current as HTMLInputElement).setAttribute(
        "value",
        page.googleSheetLink || ""
      );
    }
  }, [instructionPageBool]);

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
    setIsLoading(true)
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
    <div className={styles.container}>

      {instructionPageBool ?
      (<div style={{display: "flex", flexDirection: "column", rowGap: "5rem", alignItems: "center"}}>
        <div>
          <div className={styles.title}>
            <h1>link your google sheet</h1>
            <img src={GoogleSheetsLogo} />
          </div>
          <div className={styles.subtitle}>
            <p style={{color: "#087DF1"}}>share your google sheet with our service email to enable our system's access</p>
          </div>

        </div>
        
        <div style={{display: "flex", width: "100%", flexDirection: "row"}}>
          <div style={{display: "flex", flexDirection: "column", width: "30%", justifyContent: "center", alignItems: "flex-end"}}>
            <div className={styles.numberCircle}>
              1
            </div>
              <svg width="4rem" height="2rem" viewBox="-1.5 0 1 10" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="10%" x2="0" y2="90%" strokeWidth={0.5} stroke="#087DF1" />
              </svg>
            <div className={styles.numberCircle}>
              2
            </div>
              <svg width="4rem" height="2rem" viewBox="-1.5 0 1 10" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="10%" x2="0" y2="90%" strokeWidth={0.5} stroke="#087DF1" />
              </svg>
            <div className={styles.numberCircle}>
              3
            </div>
          </div>
          <div style={{display: "flex", width: "50%", flexDirection: "column", rowGap: "20%", textAlign: "left", marginLeft: "5%"}}>
            <p className={styles.blueParagraphText}><br/>click the share button on your google</p>
            <p className={styles.blueParagraphText}>share with this email: <span className={styles.bold}>wdcc-membership-checker@membership-checker.iam.gserviceaccount.com</span></p>
            <p className={styles.blueParagraphText}>click next to paste your google sheet link in the next step</p>
          </div>
        </div>
        
        <Button
          buttonText="next"
          height="40px"
          onClick={() => {
            setInstructionPageBool(false)
            showInstructions();
          }}
          fontSize="14px"
          width="80px"
        />
      </div>) : (<div style={{display: "flex", flexDirection: "column", rowGap: "10vh", alignItems: "center"}}>
        <div>
          <div id={styles.CustomisePageBackButton}>
            <BackButton
              onClick={() => {setInstructionPageBool(true)}}
              color="#087DF1"
              size="45px"
              hoverColor="#cceeff"
              backgroundColor="transparent"
              margin="0 500px 0 0"
            />
          </div>
          <div className={styles.title}>
            <h1>link your google sheet</h1>
            <img src={GoogleSheetsLogo} />
          </div>
          <i className={styles.subtitle}>
            paste the link to the google sheet with {`<club acronym>`}'s
            membership data
          </i>
        </div>
        <div style={{ width: "100%", marginBottom: "-10px" }}>
          <Textfield
            errorText="enter valid link"
            fontSize="1rem"
            height="45px"
            icon={LinkIcon}
            isError={isError}
            placeholder={"paste link here"}
            ref={inputRef}
            width="100%"
          />
        </div>
        <div>
          <p style={{ fontSize: "14px", color: "#707070" }}>
            If you have more than one google sheet (e.g. for different years), you
            can create more membership checker pages for your club later in the
            admin dashboard.
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
      </div>)}
    </div>
  );
};

export default GoogleSheetForm;