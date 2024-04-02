import styles from './style.module.css';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { PageContextProvider } from './EditCheckerPage';
import IPage from '../../types/IPage';
import { useContext, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';
import { getSpreadsheetId } from './GoogleSheetForm';
import { IClubDetails } from '../club-detail-page/ClubDetailPage';
import { getSheetTabId } from './GoogleSheetForm';

interface CustomiseConfirmCreateProps {
  onNext: () => void;
  onBack: () => void;
  clubDetails: IClubDetails;
}

const CustomiseConfirmCreate = ({
  onNext,
  onBack,
  clubDetails,
}: CustomiseConfirmCreateProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleNext(): void {
    axios(`/club/get-organisationId/${clubDetails.clubName}`).then((res) => {
      const id = res.data.organisationId;
      const formData = new FormData();
      if (page.backgroundImageLink)
        formData.append('background', page.backgroundImageLink);
      if (page.logoLink) formData.append('logo', page.logoLink);
      if (page.title) formData.append('name', page.title);
      formData.append('organisationId', id);
      formData.append(
        'identificationColumns',
        JSON.stringify(page.identificationColumns)
      );
      formData.append('sheetId', getSpreadsheetId(page.googleSheetLink!)!);
      formData.append('sheetTabId', getSheetTabId(page.googleSheetLink!)!);
      formData.append(
        'textFieldBackgroundColor',
        page.textFieldBackgroundColor!
      );
      if (page.textFieldtextColor)
        formData.append('textColor', page.textFieldtextColor!);
      if (page.buttonColor) formData.append('buttonColor', page.buttonColor!);
      if (page.titleTextColor)
        formData.append('headingColor', page.titleTextColor!);
      if (page.font) formData.append('fontFamily', page.font!);
      if (page.backgroundColor)
        formData.append('backgroundColor', page.backgroundColor);
      if (page.dropDownBackgroundColor)
        formData.append(
          'dropDownBackgroundColor',
          page.dropDownBackgroundColor
        );
      console.log('confirm:' + page.dropDownBackgroundColor);
      axios
        .post('/pages/create', formData)
        .then((res) => {
          navigate('/confirmation', {
            state: { pathId: res.data.pathId, clubDetails: clubDetails },
          });
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err); // handle error
        });
    });
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
            margin="0 0 0 -24px"
          />
        <div className={styles.title}>
          <h1>customise page for your members</h1>
        </div>
        <div
        
        >
          <p
            style={{
              color: '#707070',
              float: 'left',
              fontFamily: 'Montserrat',
              fontWeight: '450',
              fontSize: '1rem',
              lineHeight: '1.25',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            please ensure that you are happy with how your page preview looks
            and click confirm to create the page
          </p>
        </div>
        <div>
          <Button
            onClick={handleNext}
            buttonText="confirm"
            width="110px"
            height="50px"
            fontWeight="500"
            isLoading={isLoading}
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

export default CustomiseConfirmCreate;
