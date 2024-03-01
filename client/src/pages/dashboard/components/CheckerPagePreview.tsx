import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import styles from './CheckerPagePreview.module.css';
import ClubCheckerPage from '../../club-checker-page/ClubCheckerPage';
import Textfield from '../../../components/Textfield';
import copyIcon from '../../../assets/CopyIcon2.svg';
import ClickNextArrow from '../../../assets/ClickNextArrow.svg';
import ClickPrevArrow from '../../../assets/ClickPreviousArrow.svg';
import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';
import { useNavigate } from 'react-router';
import { IClubDetails } from '../../club-detail-page/ClubDetailPage';

const CheckerPagePreview = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const pages = dashboard.dashboardPage?.pages || [];
  console.log(pages);

  const currentPageIndex = dashboard.selectedPageIndex;

  const handleNextPage = () => {
    if (currentPageIndex !== undefined && currentPageIndex < pages.length - 1) {
      setDashboard({ ...dashboard, selectedPageIndex: currentPageIndex + 1 });
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex !== undefined && currentPageIndex > 0) {
      setDashboard({ ...dashboard, selectedPageIndex: currentPageIndex - 1 });
    }
  };

  let currentPageData;
  if (currentPageIndex !== undefined) {
    currentPageData = pages[currentPageIndex]; // Get the data for the current page
  }

  const handleCopyButtonClick = async () => {
    if (textFieldRef.current) {
      const value = textFieldRef.current?.placeholder;
      try {
        await navigator.clipboard.writeText(value);
        console.log('Copy succeeded');
      } catch (error) {
        console.log('Copy failed:  ', error);
      }
    }
  };

  const clubDetails: IClubDetails | undefined = dashboard.selectedClub
    ? {
        clubAcronym:
          dashboard.dashboardPage?.club.acronym || dashboard.selectedClub.name,
        clubName: dashboard.selectedClub?.name,
      }
    : undefined;

  const onCreateNewCheckerPage = () => {
    navigate('/create-page', { state: clubDetails });
  };

  return (
    <div className="relative p-2">
      <div className="flex justify-between flex-col gap-2">
        <p className="font-display font-bold text-[#03045e] cursor-none">
          Checker Pages
        </p>
        <p>
          <a
            className="cursor-pointer text-[#03045e]"
            onClick={() => onCreateNewCheckerPage()}
          >
            Create Page
          </a>
        </p>
      </div>
      <div className="relative w-full h-full flex flex-col gap-2">
        {/* Read-only textbox and copy button */}
        <div className="relative flex items-center placeholder:text-[#03045e] placeholder:italic placeholder:font-bold">
          <Textfield
            height="2rem"
            width="100%"
            placeholder={
              currentPageData?.webLink == undefined
                ? 'No Link'
                : `https://membership.wdcc.co.nz/${currentPageData!.webLink}`
            }
            readOnly={true}
            backgroundColor="#C1C1C2"
            ref={textFieldRef}
          />
          <button
            className="absolute right-[1rem] cursor-pointer w-4"
            onClick={
              currentPageData && currentPageData.webLink
                ? handleCopyButtonClick
                : () => {}
            }
            style={{
              visibility:
                currentPageData && currentPageData ? 'visible' : 'hidden',
            }}
          >
            <img
              src={copyIcon}
              alt="Copy"
              className="hover:fill-[#1e40af] transition-all"
            />
          </button>
        </div>

        <div className="relative flex flex-col justify-center items-center">
          {!!pages.length && currentPageData ? (
            <ClubCheckerPage
              title={currentPageData.title}
              backgroundColor={currentPageData.backgroundColor}
              titleTextColor={currentPageData.titleTextColor}
              textFieldBackgroundColor={
                currentPageData.textFieldBackgroundColor
              }
              textFieldTextColor={currentPageData.textFieldBackgroundColor}
              buttonBackgroundColor={currentPageData.buttonColor}
              dropDownBackgroundColor={currentPageData.dropDownBackgroundColor}
              font={currentPageData.font}
              optionsList={currentPageData.identificationColumns!}
              isOnboarding={false}
              webLink={currentPageData.webLink}
              clubLogoUrl={currentPageData.logoLink}
              backgroundImageUrl={currentPageData.backgroundImageLink}
            />
          ) : (
            <ClubCheckerPage
              title="You have not created a page yet"
              backgroundColor="#eee"
              titleTextColor="#000"
              textFieldBackgroundColor="#111"
              textFieldTextColor="#222"
              buttonBackgroundColor="#333"
              dropDownBackgroundColor="#444"
              font="Montserrat"
              optionsList={[
                {
                  originalName: 'Nothing',
                  displayName: 'Nothing',
                },
              ]}
              isOnboarding={false}
              webLink="/"
              clubLogoUrl={undefined}
              backgroundImageUrl={undefined}
            />
          )}
          <div className="absolute h-full w-full">
            {/*div for links */}
            <div className="left-[10px] top-[10px] absolute w-fit">
              {/* Edit button (edit functionality to be implemented) */}
              {currentPageData && currentPageData.webLink && (
                <a href={`/edit/${currentPageData?.webLink}`}>Edit</a>
              )}
              {/* <span> | </span> */}
              {/* View API keys button (view API keys functionality to be implemented) */}
              {/* <a href="#">View API Keys</a> */}
              {/* <span> | </span> */}
              {/* Delete button (delete functionality to be implemented) */}
              {/* <a href="#">Delete</a> */}
            </div>
            {/* Navigation buttons */}
            <div className="absolute top-[45%] left-[15px] w-fit">
              {!!currentPageIndex && currentPageIndex > 0 && (
                <img
                  src={ClickPrevArrow}
                  alt="Click Previous"
                  className="w-[3rem] h-[3rem] hover:bg-transparent hover:opacity-60"
                  onClick={handlePrevPage}
                />
              )}
            </div>
            <div className={styles.nextArrowContainer}>
              {!!currentPageIndex && currentPageIndex < pages.length - 1 && (
                <img
                  src={ClickNextArrow}
                  alt="Click Next"
                  className="w-[3rem] h-[3rem] hover:bg-transparent hover:opacity-60"
                  onClick={handleNextPage}
                />
              )}
            </div>

            {pages.length > 1 && (
              <div className="flex justify-center items-center absolute bottom-[10px] left-[50%] -translate-x-[50%]">
                {/* Show the navigation dots */}
                {pages.map((page, index) => (
                  <span
                    key={index}
                    className={`${
                      index === currentPageIndex
                        ? styles.activeDot + ' ' + styles.clicked
                        : styles.dot
                    }`}
                    onClick={() =>
                      setDashboard({ ...dashboard, selectedPageIndex: index })
                    }
                  >
                    <span className={styles.innerDot} />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckerPagePreview;
