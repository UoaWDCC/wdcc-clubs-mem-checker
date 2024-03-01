import WdccLogo from '../assets/wdcc_blue_logo.svg';

interface BackgroundProps {
  children?: React.ReactNode;
}
const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="bg-[#e6e9f1] flex relative h-screen w-screen">
      <img
        className="fixed top-4 right-4 w-[9em]"
        src={WdccLogo}
      />
      {children}
    </div>
  );
};

export default Background;
