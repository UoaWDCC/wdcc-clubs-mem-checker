import styles from './style.module.css';
import GoogleSheetsLogo from '../../assets/GoogleSheetsLogo.svg';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

interface InstructionsProps {
  onNext: () => void;
  isLoading: boolean;
}

const Direction = ({ index, text }: { index: number; text: JSX.Element }) => (
  <span className="flex flex-row gap-4 items-center">
    <span className="min-w-12 min-h-12 flex justify-center items-center rounded-full bg-[#087df1]">
      {index}
    </span>
    <p className="text-[#087DF1] md:text-xl">{text}</p>
  </span>
);

export default function Instructions({ onNext, isLoading }: InstructionsProps) {
  const handleOnNext = () => {
    if (isLoading) return;
    onNext();
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center md:bg-[#fff] font-display pt-8 justify-top gap-16 md:gap-28 p-0 bg-[transparent] md:px-10 md:py-16 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row w-full justify-center">
          <span className="float-left">
            <BackButton
              onClick={() => {}}
              color="transparent"
              size="40px"
              hoverColor="transparent"
              backgroundColor="transparent"
            />
          </span>
          <div className="w-full flex text-2xl text-[#087df1] md:pt-[2vh] justify-center items-center gap-1 md:gap-4 flex-row">
            <h1 className="font-display font-bold">link your google sheet</h1>
            <img
              className="w-14"
              src={GoogleSheetsLogo}
            />
          </div>
        </div>

        <div className="flex flex-col justify-left gap-4">
          {[
            <>click the share button on your google sheet</>,
            <>
              share with this email:
              <br />
              <em className="font-bold">
                wdcc-membership-checker@membership-checker.iam.gserviceaccount.com
              </em>
            </>,
            <>click next to paste your google sheet link in the next step</>,
          ].map((element, index) => (
            <Direction
              index={index + 1}
              text={element}
            />
          ))}
        </div>
        <Button
          buttonText="next"
          height="40px"
          onClick={handleOnNext}
          fontSize="14px"
          isLoading={isLoading}
          width="80px"
        />
      </div>
    </div>
  );
}
