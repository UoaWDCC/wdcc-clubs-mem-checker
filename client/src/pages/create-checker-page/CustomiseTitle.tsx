import styles from "./style.module.css";
import { Back } from 'iconsax-react';
import Button from "../../components/Button";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";

interface CustomiseTitleProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseTitle = ({ onNext, onBack }: CustomiseTitleProps) => {
  const [page, setPage] = useContext(PageContextProvider)  as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
  return (
    <div id={styles.customisePageContainer}>
      <div id={styles.customiseContainer}>
        <div id = {styles.CustomisePageBackButton}>
          <Button
            buttonText=""
            iconFromIconsax={<Back />}
            onClick={onBack}
            width="24px"
            height="24px"
            backgroundColor="transparent"
            border="#087DF1 solid 2px"
            color="#087DF1"
            hoverColor="#cceeff"
            borderRadius="8px"
            padding="4px"
          />
        </div>
        <div>
          <h2>customise page</h2>
          <i>customise page for your members</i>
        </div>
        <div>
          <p>please edit your title</p>
          <input type="text" placeholder="title" />
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

export default CustomiseTitle;
