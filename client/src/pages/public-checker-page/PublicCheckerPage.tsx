import React, { useEffect, useState, useRef } from 'react';
import ClubCheckerPage from '../club-checker-page/ClubCheckerPage';
import Page from '../../types/IPage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Column from '../../types/IColumn';
import styles from './style.module.css';
import WebFont from 'webfontloader';
const PublicCheckerPage = () => {
  const [pageData, setPageData] = useState<Page>({});
  const { webLinkId } = useParams();
  let columnArray: Column[] = [];

  useEffect(() => {
    axios
      .get(`/pages/info/${webLinkId}`)
      .then((response) => {
        WebFont.load({
          google: {
            families: [response.data!.font!],
          },
        });
        setPageData(response.data!);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (pageData.identificationColumns) {
    columnArray = pageData.identificationColumns.map((obj) => ({
      // @ts-ignore
      originalName: obj.sheetsName ?? '',
      // @ts-ignore
      displayName: obj.mappedTo ?? '',
    }));
  }

  return (
    <div className={styles.publicCheckerPageContainer}>
      <ClubCheckerPage
        title={pageData.title}
        backgroundColor={pageData.backgroundColor}
        titleTextColor={pageData.titleTextColor}
        textFieldBackgroundColor={pageData.textFieldBackgroundColor}
        textFieldTextColor={pageData.textFieldtextColor}
        buttonBackgroundColor={pageData.buttonColor}
        dropDownBackgroundColor={pageData.dropDownBackgroundColor}
        font={pageData.font!}
        clubLogoUrl={pageData.logoLink}
        backgroundImageUrl={pageData.backgroundImageLink}
        optionsList={columnArray}
        isOnboarding={false}
        webLink={webLinkId}
      ></ClubCheckerPage>
    </div>
  );
};

export default PublicCheckerPage;
