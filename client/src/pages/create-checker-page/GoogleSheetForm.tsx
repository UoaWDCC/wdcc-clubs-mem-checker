import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import {
  Dispatch,
  SetStateAction,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import LinkIcon from "../../assets/LinkIcon.svg";
import axios from "axios";

interface GoogleSheetFormProps {
  onNext: () => void;
}

export const getSpreadsheetId = (link: string): string | null => {
  const linkArray = link.split("/");
  const idIndex =
    linkArray.findIndex((value) => value.toLowerCase() == "d") + 1;
  return linkArray[idIndex];
};

export const getSheetTabId = (link: string): string | null => {
  const regex = /edit#gid=(\w+)/;
  const linkArray = link.split("/");
  const gidIndex = linkArray.findIndex((value) =>
    value.toLowerCase().startsWith("edit#gid=", 0)
  );
  if (gidIndex === -1) return null;
  const match = linkArray[gidIndex].match(regex);
  return match ? match[1] : null;
};

export var spreadsheetColumns = {};

const GoogleSheetForm = ({ onNext }: GoogleSheetFormProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const [isError, setIsError] = useState<boolean>(false);
  const linkRegex = new RegExp(
    "^(?:https?://)?docs.google.com/spreadsheets/d/[a-zA-Z0-9-_]",
    "i"
  );

  const inputRef = createRef();
  useEffect(() => {
    (inputRef.current as HTMLInputElement).setAttribute(
      "value",
      page.googleSheetLink || ""
    );
  }, []);

  const isLinkValid = (link: string): boolean => {
    if (linkRegex.test(link)) {
      setIsError(false);
      return true;
    }
    setIsError(true);
    return false;
  };

  const handleOnNext = () => {
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
        });
    } else {
      (inputRef.current as HTMLInputElement).focus();
    }
  };

  return (
    <div className={styles.container}>
      <div>
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
      />
    </div>
  );
};

export default GoogleSheetForm;
