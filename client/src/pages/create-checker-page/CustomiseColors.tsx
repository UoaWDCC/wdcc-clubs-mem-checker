import styles from './style.module.css';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { useContext, Dispatch, SetStateAction } from 'react';
import { PageContextProvider } from './CreateCheckerPage';
import IPage from '../../types/IPage';
import { ColorPicker } from './CustomiseColors Components/ColorPicker';
import { ChromePicker } from 'react-color';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';

interface CustomiseColorsProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseColors = ({ onNext, onBack }: CustomiseColorsProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];
  function handleNext(): void {
    throw new Error('Function not implemented.');
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
        <i
          className={styles.subtitle}
          style={{ fontWeight: 500 }}
        >
          customise page for your members
        </i>
        <div style={{ float: 'left', width: '100%' }}>
          <ColorPicker />
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button
            onClick={onNext}
            buttonText="next"
            width="5vw"
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
            clubLogoUrl={
              // @ts-ignore
              page.logoLink ? URL.createObjectURL(page.logoLink!) : undefined
            }
            backgroundImageUrl={
              page.backgroundImageLink
                ? // @ts-ignore
                  URL.createObjectURL(page.backgroundImageLink!)
                : undefined
            }
            optionsList={page.identificationColumns || []}
            isOnboarding={true}
          />
        </div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseColors;
