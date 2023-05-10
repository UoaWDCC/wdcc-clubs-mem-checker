import { useState } from "react";
import Background from "../Background";
import ClubDetailForm from "./ClubDetailForm";
import NewClubAdded from "./NewClubAdded";

const ClubDetailPage = () => {
  const [progress, setProgress] = useState(1);
  const onNext = (clubName: string) => {
    setProgress(progress + 1);
    setClubName(clubName);
  };

  const [clubName, setClubName] = useState("");

  const steps: Map<number, JSX.Element> = new Map([
    [1, <ClubDetailForm onNext={onNext} />],
    [2, <NewClubAdded clubName={clubName} />],
  ]);

  return <Background>{steps.get(progress)}</Background>;
};

export default ClubDetailPage;
