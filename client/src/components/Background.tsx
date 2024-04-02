import WdccLogo from '../assets/wdcc_blue_logo.svg';

interface BackgroundProps {
  children?: React.ReactNode;
}
const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="bg-[#f3f2f4] flex relative h-screen w-screen">
      <img
        className="fixed top-4 right-4 w-[7em] md:w-[9em]"
        src={WdccLogo}
      />
      {children}
    </div>
  );
};

export default Background;
