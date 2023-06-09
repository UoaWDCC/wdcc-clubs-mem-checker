import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { Page, PageContextProvider } from "./CreateCheckerPage";
import { useContext, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface CustomiseConfirmProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseConfirm = ({ onNext, onBack }: CustomiseConfirmProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  const navigate = useNavigate();
  function handleNext(): void {
    axios.post ("/customise-page/create-page", page).then((res) => {
      navigate("/confirmation", { state: res.data});
  }).catch((err) => {
    console.log(err); // handle error
  });

}

  return (
    <div id={styles.customisePageContainer}>
    <div id={styles.customiseContainer}>
      <div id={styles.CustomisePageBackButton}>
      <BackButton
            onClick={onBack}
            color="#087DF1"
            size="27px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin="0 500px 0 0"
          />
      </div>
      <div className={styles.title}>
        <h1>customise page</h1>
      </div>
      <i className={styles.subtitle} style={{ fontWeight: 500 }}>
        customise page for your members
      </i>
      <div style={{ marginTop: "7.5vh", marginLeft: "4.75vw", marginRight: "4.75vw" }}>
        <p style={{ color: "#707070", float: "left", fontFamily: "Montserrat", fontWeight: "450",fontSize: "1.5rem", lineHeight:"1.25" }}>
        please ensure that you are happy with how your page preview looks and click confirm to create the page
        </p>
    
      </div>
      <div id={styles.CustomisePageNextButton}>
        <Button onClick={handleNext} buttonText="confirm" width="6vw" height="5vh" fontWeight="500" />
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