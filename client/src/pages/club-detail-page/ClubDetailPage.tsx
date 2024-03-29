import { useState } from "react";
import Background from "../../components/Background";
import ClubDetailForm from "./ClubDetailForm";
import NewClubAdded from "./NewClubAdded";

export interface IClubDetails {
  clubName: string;
  clubAcronym: string;
}

const ClubDetailPage = () => {
  const [progress, setProgress] = useState(1);
  const [clubDetails, setClubDetails] = useState<IClubDetails>({
    clubName: "",
    clubAcronym: "",
  });

  const onNext = (clubDetails: IClubDetails) => {
    setProgress(progress + 1);
    setClubDetails(clubDetails);
  };

  const steps: Map<number, JSX.Element> = new Map([
    [1, <ClubDetailForm onNext={onNext} />],
    [2, <NewClubAdded clubDetails={clubDetails} />],
  ]);

  return <Background>{steps.get(progress)}</Background>;
};

export default ClubDetailPage;
