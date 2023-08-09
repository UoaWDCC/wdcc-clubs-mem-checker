import React, { useState } from 'react';
import styles from './CheckerPagePreview.module.css';
import ClubCheckerPage from '../pages/club-checker-page/ClubCheckerPage';

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

    return (
        <div className={styles.uploadButtonContainer}>
            <div className={styles.previewContainer}>
                <p className={styles.overlayText}>Checker Pages</p>
                <div className={styles.preview}>
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
                            isOnboarding={currentPageData.isOnboarding}
                        />
                        <div className={styles.overlayButtons}>
                            {/* Navigation buttons */}
                            <button onClick={handlePrevPage} disabled={currentPage === 0}>
                                Prev
                            </button>
                            <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
                                Next
                            </button>
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
                    </div>
                    {pages.length > 1 && (
                        <div className={styles.pagination}>
                            {/* Show the navigation dots */}
                            {pages.map((page, index) => (
                                <span
                                    key={page.clubId}
                                    className={index === page.clubId ? styles.activeDot : styles.dot}
                                    onClick={() => setCurrentPage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckerPagePreview;