import styles from "./style.module.css";
import { BackSquare } from 'iconsax-react';
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";

interface CustomiseBackgroundProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseBackground = ({ onNext, onBack }: CustomiseBackgroundProps) => {
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
          <p>upload a background image (optional)</p>
        </div>
        <button id={styles.CustomisePageNextButton} onClick={onNext}>
          next
        </button>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseBackground;
