import React, { useState, useRef } from 'react';
import styles from './CheckerPagePreview.module.css';
import ClubCheckerPage from '../pages/club-checker-page/ClubCheckerPage';
import Textfield from "./Textfield";
import copyIcon from "../assets/CopyIcon2.svg";
import ClickNextArrow from "../assets/ClickNextArrow.svg";
import ClickPrevArrow from "../assets/ClickPreviousArrow.svg";

interface CheckerPage {
    clubId: number;
    clubName: string;
    title?: string;
    backgroundColor?: string;
    titleTextColor?: string;
    textFieldBackgroundColor?: string;
    textFieldTextColor?: string;
    buttonBackgroundColor?: string;
    dropDownBackgroundColor?: string;
    font?: string;
    clubLogoUrl?: File;
    backgroundImageUrl?: File;
    optionsList: { originalName: string; displayName: string }[];
    isOnboarding: boolean;
}

interface CheckerPagePreviewProps {
    pages: CheckerPage[];
}

const CheckerPagePreview: React.FC<CheckerPagePreviewProps> = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentPageData = pages[currentPage]; // Get the data for the current page

    const handleCopyButtonClick = async () => {
        if (textFieldRef.current){
            const value = textFieldRef.current?.placeholder;
            try{
                await navigator.clipboard.writeText(value);
                console.log('Copy succeeded');
            } catch (error){

                console.log('Copy failed:  ', error);
            }
        }

    };

    return (
        <div className={styles.previewContainer}>
            <p className={styles.overlayText}>Checker Pages</p>
            <div className={styles.preview}>
                {/* Read-only textbox and copy button */}
                {pages.length > 1 && (
                    <div className={styles.urlContainer}>
                        <Textfield height="2rem" width="100%" placeholder="www.checkerpage.com" readOnly={true} backgroundColor="#C1C1C2" ref={textFieldRef}/>
                        <button className={styles.copyButton} onClick={handleCopyButtonClick}>
                            <img src={copyIcon} alt="Copy" className={styles.copyIcon} />
                        </button>
                    </div>
                )}

                <div key={currentPageData.clubId} className={styles.checkerPageWrapper}>
                    <ClubCheckerPage
                        clubId={currentPageData.clubId}
                        clubName={currentPageData.clubName}
                        title={currentPageData.title}
                        backgroundColor={currentPageData.backgroundColor}
                        titleTextColor={currentPageData.titleTextColor}
                        textFieldBackgroundColor={currentPageData.textFieldBackgroundColor}
                        textFieldTextColor={currentPageData.textFieldTextColor}
                        buttonBackgroundColor={currentPageData.buttonBackgroundColor}
                        dropDownBackgroundColor={currentPageData.dropDownBackgroundColor}
                        font={currentPageData.font}
                        clubLogoUrl={currentPageData.clubLogoUrl}
                        backgroundImageUrl={currentPageData.backgroundImageUrl}
                        optionsList={currentPageData.optionsList}
                        isOnboarding={true}
                    />
                    <div className={styles.overlayButtons}>
                        {/* Navigation buttons */}
                        {currentPage > 0 && (
                            <img src={ClickPrevArrow} alt="Click Next" className={styles.prevArrow} onClick={handlePrevPage}/>
                        )}
                        {currentPage < pages.length - 1 && (
                            <img src={ClickNextArrow} alt="Click Next" className={styles.nextArrow} onClick={handleNextPage}/>
                        )}
                    </div>
                    {pages.length > 1 && (
                        <div className={styles.overlayButtons}>
                            {/* Edit button (edit functionality to be implemented) */}
                            <a href="#">Edit</a>
                            <span>|</span>
                            {/* View API keys button (view API keys functionality to be implemented) */}
                            <a href="#">View API Keys</a>
                            <span>|</span>
                            {/* Delete button (delete functionality to be implemented) */}
                            <a href="#">Delete</a>
                        </div>
                    )}
                    {pages.length > 1 && (
                        <div className={styles.pagination}>
                            {/* Show the navigation dots */}
                            {pages.map((page, index) => (
                                <span
                                    key={page.clubId}
                                    className={`${index === currentPage ? styles.activeDot + " " + styles.clicked : styles.dot}`}
                                    onClick={() => setCurrentPage(index)}
                                >
                                <span className={styles.innerDot} />
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckerPagePreview;