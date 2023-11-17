import styles from "./style.module.css";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
import { PageContextProvider } from "./CreateCheckerPage";
import IPage from "../../types/IPage";
import { useContext, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ClubCheckerPage from "../club-checker-page/ClubCheckerPage";
import { getSpreadsheetId } from "./GoogleSheetForm";
import { IClubDetails } from "../club-detail-page/ClubDetailPage";
import { getSheetTabId } from "./GoogleSheetForm";
import ICreateCheckerPageContext from "../../types/ICreateCheckerPageContext";

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
  const [context, setConetxt] = useContext(PageContextProvider) as [
    ICreateCheckerPageContext,
    Dispatch<SetStateAction<ICreateCheckerPageContext>>
  ];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleNext(): void {
    axios(`/club/get-organisationId/${clubDetails.clubName}`).then((res) => {
      const id = res.data.organisationId;
      const formData = new FormData();
      if (context.page.backgroundImageLink)
        formData.append("background", context.page.backgroundImageLink);
      if (context.page.logoLink) formData.append("logo", context.page.logoLink);
      if (context.page.title) formData.append("name", context.page.title);
      formData.append("organisationId", id);
      formData.append(
        "identificationColumns",
        JSON.stringify(context.page.identificationColumns)
      );
      formData.append(
        "sheetId",
        getSpreadsheetId(context.page.googleSheetLink!)!
      );
      formData.append(
        "sheetTabId",
        getSheetTabId(context.page.googleSheetLink!)!
      );
      formData.append(
        "textFieldBackgroundColor",
        context.page.textFieldBackgroundColor!
      );
      if (context.page.textFieldtextColor)
        formData.append("textColor", context.page.textFieldtextColor!);
      if (context.page.buttonColor)
        formData.append("buttonColor", context.page.buttonColor!);
      if (context.page.titleTextColor)
        formData.append("headingColor", context.page.titleTextColor!);
      if (context.page.font) formData.append("fontFamily", context.page.font!);
      if (context.page.backgroundColor)
        formData.append("backgroundColor", context.page.backgroundColor);
      if (context.page.dropDownBackgroundColor)
        formData.append(
          "dropDownBackgroundColor",
          context.page.dropDownBackgroundColor
        );
      console.log("confirm:" + context.page.dropDownBackgroundColor);
      axios
        .post("/pages/create", formData)
        .then((res) => {
          navigate("/confirmation", {
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
        <i className={styles.subtitle} style={{ fontWeight: 500 }}>
          customise page for your members
        </i>
        <div
          style={{
            marginTop: "7.5vh",
            marginLeft: "4.75vw",
            marginRight: "4.75vw",
          }}
        >
          <p
            style={{
              color: "#707070",
              float: "left",
              fontFamily: "Montserrat",
              fontWeight: "450",
              fontSize: "1.5rem",
              lineHeight: "1.25",
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
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className={styles.previewContainer}>
        <div className={styles.preview}>
          <ClubCheckerPage
            clubId={0}
            clubName={""}
            title={context.page.title}
            backgroundColor={context.page.backgroundColor}
            titleTextColor={context.page.titleTextColor}
            textFieldBackgroundColor={context.page.textFieldBackgroundColor}
            textFieldTextColor={context.page.textFieldtextColor}
            buttonBackgroundColor={context.page.buttonColor}
            dropDownBackgroundColor={context.page.dropDownBackgroundColor}
            font={context.page.font}
            clubLogoUrl={
              context.page.logoLink
                ? // @ts-ignore
                  URL.createObjectURL(context.page.logoLink!)
                : undefined
            }
            backgroundImageUrl={
              context.page.backgroundImageLink
                ? // @ts-ignore
                  URL.createObjectURL(context.page.backgroundImageLink!)
                : undefined
            }
            optionsList={context.page.identificationColumns || []}
            isOnboarding={true}
          />
        </div>
        <i>page preview</i>
      </div>
    </div>
  );
};

export default CustomiseConfirm;
