import styles from './style.module.css';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { useContext, Dispatch, SetStateAction } from 'react';
import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import UploadButton from './CustomiseLogo Components/UploadButton';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';

interface CustomiseBackgroundProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseBackground = ({ onNext, onBack }: CustomiseBackgroundProps) => {
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
            margin="0 0 0 -24px"
          />

        <div>
          <h2 className={styles.customisePageTitle}>customise page</h2>
          <i className={styles.subtitle}>customise page for your members</i>
          <p className={styles.optionalText}>
            upload a background image (optional)
          </p>
          <div>
            <UploadButton
              // @ts-ignore
              onFileSelect={(file) =>
                // @ts-ignore
                setPage({ ...page, backgroundImageLink: file })
              }
              // @ts-ignore
              currentFile={page.backgroundImageLink} // Pass the current file from the page state
            />
          </div>
        </div>
        <div className='mt-6'>
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

export default CustomiseBackground;
