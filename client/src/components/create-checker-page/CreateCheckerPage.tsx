import { useState } from "react";
import GoogleSheetForm from "./GoogleSheetForm";
import CustomisePage from "./CustomiseTitle";
import Background from "../Background";
import ColumnSelector from "./ColumnSelector";
import styles from "./style.module.css";
import CustomiseTitle from "./CustomiseTitle";
import CustomiseFont from "./CustomiseFont";
import CustomiseColours from "./CustomiseColours";
import CustomiseLogo from "./CustomiseLogo";
import CustomiseBackground from "./CustomiseBackground";
import CustomiseConfirm from "./CustomiseConfirm";

const CreateCheckerPage = () => {
  const [progress, setProgress] = useState(1);
  const onNext = () => setProgress(progress + 1);
  const onBack = () => setProgress(progress - 1);
  const [showConfirm, setShowConfirm] = useState(false);
  const steps: Map<number, JSX.Element> = new Map([
    [1, <GoogleSheetForm onNext={onNext} />],
    [2, <ColumnSelector onNext={onNext} onBack={onBack} />],
    [3, <CustomiseTitle onNext={onNext} onBack={onBack} />],
    [4, <CustomiseFont onNext={onNext} onBack={onBack} />],
    [5, <CustomiseColours onNext={onNext} onBack={onBack} />],
    [6, <CustomiseLogo onNext={onNext} onBack={onBack} />],
    [
      7,
      <CustomiseBackground
        onNext={() => setShowConfirm(true)}
        onBack={onBack}
      />,
    ],
  ]);

  return (
    <Background>
      <div id={styles.progressBarContainer}>
        <div id={styles.progressBar}>
          {Array.from(steps).map((keyValue) => {
            const key = keyValue[0];
            return (
              <button
                className={styles.bar}
                key={key}
                style={key === progress ? { opacity: 1 } : {}}
                onClick={() => setProgress(key)}
              />
            );
          })}
        </div>
        <p style={{ marginLeft: "10px" }}>
          {progress} of {steps.size}
        </p>
      </div>
      {showConfirm ? (
        <CustomiseConfirm
          onNext={() => console.log("confirmed")}
          onBack={() => setShowConfirm(false)}
        />
      ) : (
        steps.get(progress)
      )}
    </Background>
  );
};

export default CreateCheckerPage;
