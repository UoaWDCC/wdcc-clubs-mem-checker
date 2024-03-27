import { useState } from 'react';
import styles from './style.module.css';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { Dispatch, SetStateAction, useContext } from 'react';
import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import FontPicker from 'react-fontpicker-ts';
import 'react-fontpicker-ts/dist/index.css';
import { ArrowDown2 } from 'iconsax-react';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';

interface CustomiseFontProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseFont = ({ onNext, onBack }: CustomiseFontProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];

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
        <i
          className={styles.subtitle}
          style={{ fontWeight: 500 }}
        >
          customise page for your members
        </i>
        <div className={styles.styling_container}>
          <p className={styles.styling_subtext}>please choose a font</p>
          <ArrowDown2
            style={{
              position: 'absolute',
              zIndex: '2',
              top: '30px',
              left: 'calc(100% - 50px)',
            }}
            size="32"
            color="#AAAAAA"
          />
          <FontPicker
            autoLoad
            defaultValue={page.font || 'Montserrat'}
            fontCategories={['serif', 'sans-serif']}
            value={(font: string) => {
              setPage({ ...page, font });
            }}
          />
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button
            onClick={onNext}
            buttonText="next"
            width="7vw"
            height="4.5vh"
          />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}>
          <ClubCheckerPage
            clubId={0}
            clubName={''}
            title={page.title}
            backgroundColor={page.backgroundColor}
            titleTextColor={page.titleTextColor}
            textFieldBackgroundColor={page.textFieldBackgroundColor}
            textFieldTextColor={page.textFieldtextColor}
            buttonBackgroundColor={page.buttonColor}
            dropDownBackgroundColor={page.dropDownBackgroundColor}
            font={page.font}
            clubLogoUrl={page.logoLink}
            backgroundImageUrl={page.backgroundImageLink}
            optionsList={page.identificationColumns || []}
            isOnboarding={true}
          />
        </div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseFont;
