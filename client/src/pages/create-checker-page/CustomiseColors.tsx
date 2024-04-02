import styles from './style.module.css';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { useContext, Dispatch, SetStateAction } from 'react';
import { PageContextProvider } from './EditCheckerPage';
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
        <BackButton
            onClick={onBack}
            color="#087DF1"
            size="27px"
            hoverColor="#cceeff"
            backgroundColor="transparent"
            margin='-12px 0 0 -36px'
        />

        <div className={styles.title}>
          <h1>customise page for your members</h1>
        </div>

        <div className='overflow-auto' style={{ float: 'left', width: '100%', marginBottom: '18px' }}>
          <ColorPicker />
        </div>
   
        <div className='mt-4'>
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

export default CustomiseColors;
