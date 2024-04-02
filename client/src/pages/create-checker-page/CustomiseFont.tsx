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
      
        <BackButton
            onClick={onBack}
            color="#087DF1"
            size="27px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin='-12px 0 0 -24px'
        />
       
        <div className={styles.title}>
          <h1>customise page for your members</h1>
        </div>
      
        <div className='my-6 relative'>
          <p className={styles.styling_subtext}>please choose a font</p>
          <ArrowDown2
            style={{
              position: 'absolute',
              zIndex: '2',
              top: '30px',
              left: 'calc(100% - 50px)',
            }}
            size="32"
            color="#000"
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
        <div className='pt-4'>
          <Button
            onClick={onNext}
            buttonText="next"
            width="90px"
            height="50px"
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
      </div>
    </div>
  );
};

export default CustomiseFont;
