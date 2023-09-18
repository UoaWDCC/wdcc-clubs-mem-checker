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

const CheckerPagePreview = () => {
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const pages = dashboard.dashboardPage?.pages;
  if (pages === undefined) {
    return <div></div>;
  }

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

  return (
    <div className={styles.previewContainer}>
      <p className={styles.overlayText}>Checker Pages</p>
      {currentPageIndex === undefined || currentPageData === undefined ? (
        <div>No checker pages created for this club!</div>
      ) : (
        <div className={styles.preview}>
          {/* Read-only textbox and copy button */}
          <div className={styles.urlContainer}>
            <Textfield
              height="2rem"
              width="100%"
              placeholder="www.checkerpage.com"
              readOnly={true}
              backgroundColor="#C1C1C2"
              ref={textFieldRef}
            />
            <button
              className={styles.copyButton}
              onClick={handleCopyButtonClick}
            >
              <img
                src={copyIcon}
                alt="Copy"
                className={styles.copyIcon}
              />
            </button>
          </div>

          <div className={styles.checkerPageWrapper}>
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
              isOnboarding={true}
              clubLogoUrl={currentPageData.logoLink}
              backgroundImageUrl={currentPageData.backgroundImageLink}
            />
            <div className={styles.overlayButtons}>
              {/*div for links */}
              <div className={styles.pageLinksContainer}>
                {/* Edit button (edit functionality to be implemented) */}
                <a href="#">Edit</a>
                <span> | </span>
                {/* View API keys button (view API keys functionality to be implemented) */}
                <a href="#">View API Keys</a>
                <span> | </span>
                {/* Delete button (delete functionality to be implemented) */}
                <a href="#">Delete</a>
              </div>
              {/* Navigation buttons */}
              <div className={styles.prevArrowContainer}>
                {currentPageIndex > 0 && (
                  <img
                    src={ClickPrevArrow}
                    alt="Click Previous"
                    className={styles.prevArrow}
                    onClick={handlePrevPage}
                  />
                )}
              </div>
              <div className={styles.nextArrowContainer}>
                {currentPageIndex < pages.length - 1 && (
                  <img
                    src={ClickNextArrow}
                    alt="Click Next"
                    className={styles.nextArrow}
                    onClick={handleNextPage}
                  />
                )}
              </div>

              {pages.length > 1 && (
                <div className={styles.pagination}>
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
      )}
    </div>
  );
};

export default CheckerPagePreview;
