import React, { useEffect, useState } from "react";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import Page from "../../types/Page";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Column from "../../types/Column";

const PublicCheckerPage = () => {
    const [pageData, setPageData] = useState<Page>({});
    const weblinkId = "bsWwPRZRyH0YJojidNxTW";

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
    //console.log(pageData.identificationColumns![0]);
    console.log('page cols: ', pageData.identificationColumns);

    return (
    <>
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
        optionsList={pageData.identificationColumns!}
        
        // optionsList={[
        //     { originalName: "column1", displayName: "upi" },
        //     { originalName: "column2", displayName: "first name" },
        //     { originalName: "column3", displayName: "last name" },
        //   ]}
        isOnboarding={false}
        
        ></ClubCheckerPage>
    </>
    );

}

export default PublicCheckerPage;