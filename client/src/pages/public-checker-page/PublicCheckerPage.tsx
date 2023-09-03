import React, { useEffect, useState } from "react";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import Page from "../../types/Page";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Column from "../../types/Column";
import styles from "./style.module.css";

const PublicCheckerPage = () => {
    const [pageData, setPageData] = useState<Page>({});
    const { weblinkId } = useParams();
    var columnArray : Column[];

    useEffect(() => {
        axios
        .get(`/pages/info/${weblinkId}`)
        .then((response) => {
            setPageData(response.data!);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    if (pageData.identificationColumns){
        columnArray = pageData.identificationColumns.map((obj) => ({
            originalName: obj.sheetsName,
            displayName: obj.mappedTo,
          }));
    }
    

    return (
    <div className={ styles.publicCheckerPageContainer }>
        <ClubCheckerPage 
            title={pageData.title}
            backgroundColor={pageData.backgroundColor}
            titleTextColor={pageData.titleTextColor}
            textFieldBackgroundColor={pageData.textFieldBackgroundColor}
            textFieldTextColor={pageData.textFieldtextColor}
            buttonBackgroundColor={pageData.buttonColor}
            dropDownBackgroundColor={pageData.dropDownBackgroundColor}
            font={pageData.font}
            clubLogoUrl={pageData.logoLink}
            backgroundImageUrl={pageData.backgroundImageLink} 
            optionsList={columnArray}
            
            // optionsList={[
            //     { originalName: "column1", displayName: "upi" },
            //     { originalName: "column2", displayName: "first name" },
            //     { originalName: "column3", displayName: "last name" },
            //   ]}
            isOnboarding={false}
            
            ></ClubCheckerPage>
    </div>
    );

}

export default PublicCheckerPage;