import { useState } from "react";
import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { Dispatch, SetStateAction, useContext } from "react";
import { PageContextProvider, Page } from "./CreateCheckerPage";
import FontPicker from 'react-fontpicker-ts';
import 'react-fontpicker-ts/dist/index.css';
import { ArrowDown2 } from "iconsax-react";

interface CustomiseFontProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseFont = ({ onNext, onBack }: CustomiseFontProps) => {
  const [font, setFont] = useState('Montserrat')
  const [page, setPage] = useContext(PageContextProvider) as [
    Page,
    Dispatch<SetStateAction<Page>>
  ];
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
          <h2 className={styles.title}>customise page</h2>
          <i className={styles.subtitle}>customise page for your members</i>
        </div>
        <div className={styles.styling_container}>
          <p className={styles.styling_subtext}>please choose a font</p> 
          <ArrowDown2
            style={{position: "absolute", zIndex: "2", top: "30px", left: "calc(100% - 50px)"}}
            size="32"
            color="#AAAAAA"
          />         
          <FontPicker
            autoLoad
            defaultValue="Montserrat"
            fontCategories={['serif', 'sans-serif']}
            value={(font2: string) => setFont(font2)}
          />
        </div>
        <div id="backButton">
          <Button
            buttonText="next"
            onClick={onNext}
            width="5rem"
            height="2rem"
            fontSize="1rem"
          />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}></div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseFont;
