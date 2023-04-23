import { useState } from "react";
import GoogleSheetForm from "./GoogleSheetForm";
import CustomisePage from "./CustomisePage";
import Background from "../Background";
import ColumnSelector from "./ColumnSelector";
import styles from "./style.module.css";

const CreateCheckerPage = () => {
  const [progress, setProgress] = useState(1);
  const onNext = () => setProgress(progress + 1);
  const onBack = () => setProgress(progress - 1);
  const steps: Map<number, JSX.Element> = new Map([
    [1, <GoogleSheetForm onNext={onNext} onBack={() => {}} />],
    [2, <ColumnSelector onNext={onNext} onBack={onBack} />],
    [3, <CustomisePage onNext={() => console.log("submit")} onBack={onBack} />],
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
        <p style={{ marginLeft: "10px" }}>{progress} of x</p>
      </div>
      {steps.get(progress)}
    </Background>
  );
};

export default CreateCheckerPage;
