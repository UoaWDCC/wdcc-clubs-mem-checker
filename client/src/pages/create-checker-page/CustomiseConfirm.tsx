import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { Page, PageContextProvider } from "./CreateCheckerPage";
import { useContext, Dispatch, SetStateAction } from "react";
import BlueBackButton from "../../components/BlueBackButton";
import Button from "../../components/Button";
import axios from "axios";

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
    axios.post ("/customise-page/create-page", page).then((res) => {;
  });
}

  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div id = {styles.CustomisePageBackButton}>
          <BackButton
            onClick={onBack}
            color="#087DF1"
            size="27px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin="0 500px 0 0"
          />
        </div>
        <div>
          <h2>customise page</h2>
          <i className={styles.subtitle}>customise page for your members</i>
        </div>
        <div>
          <p>
            please ensure that you are happy with how your page preview looks
            and click confirm to create the page
          </p>
        </div>
        <button onClick={onNext}>confirm</button>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseConfirm;
