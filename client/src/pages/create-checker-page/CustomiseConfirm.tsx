import styles from "./style.module.css";
import BackArrow from "../../assets/BackArrow.svg";
import { Page, PageContextProvider } from "./CreateCheckerPage";
import { useContext, Dispatch, SetStateAction } from "react";
import BlueBackButton from "../../components/BlueBackButton";
import Button from "../../components/Button";

interface CustomiseConfirmProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseConfirm = ({ onNext, onBack }: CustomiseConfirmProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  function handleNext(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div id={styles.customisePageContainer}>
    <div id={styles.customiseContainer}>
      <div id={styles.CustomisePageBackButton}>
        <BlueBackButton onClick={onBack} />
      </div>
      <div className={styles.title}>
        <h1>customise page</h1>
      </div>
      <i className={styles.subtitle} style={{ fontWeight: 500 }}>
        customise page for your members
      </i>
      <div style={{ marginTop: "10vh" }}>
        <p style={{ color: "#AAAAAA", fontStyle: "italic", float: "left" }}>
        please ensure that you are happy with how your page preview looks and click confirm to create the page
        </p>
    
      </div>
      <div id={styles.CustomisePageNextButton}>
        <Button onClick={handleNext} buttonText="next" width="5vw" />
      </div>
    </div>
    <div className={styles.previewContainer}>
      <div className={styles.preview}></div>
      <i>page preview</i>
    </div>
  </div>
  );
};

export default CustomiseConfirm;
