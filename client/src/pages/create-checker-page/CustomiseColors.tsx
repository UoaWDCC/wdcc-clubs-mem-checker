import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { useContext, Dispatch, SetStateAction } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import { ColorPicker } from "./CustomiseColors Components/ColorPicker";
import { ChromePicker } from "react-color";

interface CustomiseColorsProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseColors = ({ onNext, onBack }: CustomiseColorsProps) => {
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
        <div>
          <ColorPicker />
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button onClick={onNext} buttonText="next" width="5vw" />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseColors;
