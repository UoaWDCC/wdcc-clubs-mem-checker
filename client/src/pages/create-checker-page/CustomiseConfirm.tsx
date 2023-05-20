import styles from "./style.module.css";
import { BackSquare } from 'iconsax-react';
import Button from "../../components/Button";
import { Page, PageContextProvider } from "./CreateCheckerPage";
import { useContext, Dispatch, SetStateAction } from "react";

interface CustomiseConfirmProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseConfirm = ({ onNext, onBack }: CustomiseConfirmProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div id = {styles.CustomisePageBackButton}>
          <Button
            buttonText=""
            onClick={onBack}
            iconFromIconsax={<BackSquare/>}
            iconSize="32px"
            height="27px"
            width="27px"
            backgroundColor="transparent"
            margin="0 500px 0 0"
            color="#087DF1"
            hoverColor="#cceeff"
            padding="0px"
            translateX="-2.5px"
            translateY="-2.5px"
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
