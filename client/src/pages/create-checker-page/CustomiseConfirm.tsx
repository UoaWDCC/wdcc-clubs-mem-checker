import styles from "./style.module.css";
import { Back } from 'iconsax-react';
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
