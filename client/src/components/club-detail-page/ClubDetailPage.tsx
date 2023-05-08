import { SetStateAction, useState } from "react";
import Background from "../Background";
import ClubDetailForm from "./ClubDetailForm";

import { createContext } from "react";
import Button from "../Button";

export interface Page {
  googleSheetLink?: String;
  identificationColumns?: String; // temporary type, needs to be changed when implementing column selector e.g. Column[]
  title?: String;
  font?: String;
  backgroundColor?: String;
  titleTextColor?: String;
  textFieldBackgroundColor?: String;
  textFieldtextColor?: String;
  buttonColor?: String;
  dropDownBackgroundColor?: String;
  logoLink?: String;
  backgroundImageLink?: String;
}

export const PageContextProvider = createContext([{}, () => {}]);

const CreateCheckerPage = () => {
  const [progress, setProgress] = useState(1);
  const onNext = () => setProgress(progress + 1);
  const onBack = () => setProgress(progress - 1);

  const [showConfirm, setShowConfirm] = useState(false);
  const onConfirm = () => {
    console.log("confirmed");
  };

  const [page, setPage] = useState<Page>({}); // might need default values?

  const handleConfirm = () => {
    console.log("confirmed");
  };

  return (
    <Background>
      <PageContextProvider.Provider value={[page, setPage]}>
        <ClubDetailForm onNext={onNext} onBack={onBack} />
      </PageContextProvider.Provider>
    </Background>
  );
};

export default CreateCheckerPage;
