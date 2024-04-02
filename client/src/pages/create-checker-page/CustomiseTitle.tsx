import styles from './style.module.css';
import BackButton from '../../components/BackButton';
import {
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  createRef,
  useEffect,
  useMemo,
} from 'react';

import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';

interface CustomiseTitleProps {
  onNext: () => void;
  onBack: () => void;
}

const CustomiseTitle = ({ onNext, onBack }: CustomiseTitleProps) => {
  const [error, setError] = useState<boolean>(false);
  const titleRef = createRef();
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];
  useEffect(() => {
    (titleRef.current as HTMLInputElement).setAttribute(
      'value',
      page.title || ''
    );
  }, []);

  const handleNext = () => {
    const title = (titleRef.current as HTMLInputElement).value;
    if (title === '') {
      setError(true);
    } else {
      onNext();
    }
  };
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
        <div className='my-6'>
          <p style={{ color: '#AAAAAA', fontStyle: 'italic', float: 'left' }}>
            please edit your title
          </p>
          <Textfield
            width="300px"
            height="45px"
            fontSize="20px"
            ref={titleRef}
            errorText="please enter a title to continue"
            isError={error}
            onChange={() => {
              setError(false);
              setPage({
                ...page,
                title: (titleRef.current as HTMLInputElement).value,
              });
            }}
          />
        </div>
        <div>
          <Button
            onClick={handleNext}
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

export default CustomiseTitle;
