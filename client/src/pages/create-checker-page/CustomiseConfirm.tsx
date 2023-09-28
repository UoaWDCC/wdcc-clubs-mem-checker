import styles from './style.module.css';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { PageContextProvider } from './CreateCheckerPage';
import IPage from '../../types/IPage';
import { useContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';
import { getSpreadsheetId } from './GoogleSheetForm';
import { IClubDetails } from '../club-detail-page/ClubDetailPage';
import { getSheetTabId } from './GoogleSheetForm';

interface CustomiseConfirmProps {
  onNext: () => void;
  onBack: () => void;
  clubDetails: IClubDetails;
}

const CustomiseConfirm = ({
  onNext,
  onBack,
  clubDetails,
}: CustomiseConfirmProps) => {
  const [page, setPage] = useContext(PageContextProvider) as [
    IPage,
    Dispatch<SetStateAction<IPage>>
  ];
  const navigate = useNavigate();
  function handleNext(): void {
    const url = '/api/club/get-organisationId/' + clubDetails.clubName;
    axios.get(url).then((res) => {
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
      axios
        .post('/api/pages/create', formData)
        .then((res) => {
          navigate('/confirmation', {
            state: { pathId: res.data.pathId, clubDetails: clubDetails },
          });
        })
        .catch((err) => {
          console.log(err); // handle error
        });
    });
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
        <div
          style={{
            marginTop: '7.5vh',
            marginLeft: '4.75vw',
            marginRight: '4.75vw',
          }}
        >
          <p
            style={{
              color: '#707070',
              float: 'left',
              fontFamily: 'Montserrat',
              fontWeight: '450',
              fontSize: '1.5rem',
              lineHeight: '1.25',
            }}
          >
            please ensure that you are happy with how your page preview looks
            and click confirm to create the page
          </p>
        </div>
        <div id={styles.CustomisePageNextButton}>
          <Button
            onClick={handleNext}
            buttonText="confirm"
            width="6vw"
            height="5vh"
            fontWeight="500"
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

export default CustomiseConfirm;
