import styles from "./style.module.css";
import GoogleSheetsLogo from "../../assets/GoogleSheetsLogo.svg";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import Textfield from "../../components/Textfield";
import Button from "../../components/Button";
import LinkIcon from "../../assets/LinkIcon.svg";

interface GoogleSheetFormProps {
  onNext: () => void;
}

const GoogleSheetForm = ({ onNext }: GoogleSheetFormProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];

  const [input, setInput] = useState<string>(page.googleSheetLink || "");
  const [isError, setIsError] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(input.length == 0);

  const linkRegex = new RegExp(
    "^(?:https?://)?docs.google.com/spreadsheets/d/[a-zA-Z0-9-_]",
    "i"
  );

  const isLinkValid = (link: string): boolean => {
    if (link.length == 0) {
      setIsError(false);
      setIsEmpty(true);
      return false;
    }
    if (!linkRegex.test(link)) {
      setIsEmpty(false);
      setIsError(true);
      return false;
    }
    setIsError(false);
    setIsEmpty(false);
    return true;
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    isLinkValid((event.target as HTMLInputElement).value) &&
      setPage({
        ...page,
        googleSheetLink: (event.target as HTMLInputElement).value,
      });
  };

  const handleOnNext = () => {
    onNext();
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
      <div style={{ width: "100%" }}>
        <Textfield
          errorText="enter valid link"
          icon={LinkIcon}
          height="35px"
          isError={isError}
          onChange={handleOnChange}
          placeholder={"paste link here"}
          value={input}
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
        disabled={isError || isEmpty}
        height="40px"
        onClick={handleOnNext}
        fontSize="14px"
        width="80px"
      />
    </div>
  );
};

export default GoogleSheetForm;
