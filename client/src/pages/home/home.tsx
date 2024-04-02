import WDCCLogo from "../../assets/wdcc_blue_logo.svg";
import femaleProgrammer from "../../assets/femaleProgrammer.svg";
import { useNavigate } from "react-router";
import Button from "../../components/Button";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/sign-in");
  };
  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <title>Club Membership Checker</title>
      <img
        className="absolute top-[1.5em] md:top-[3em] right-[1.5em] md:right-[3em] w-[9em] h-auto"
        src={WDCCLogo}
        alt="WDCC Logo"
      />
      <div className="flex flex-col-reverse md:flex-row gap-20 max-w-7xl mx-auto items-center justify-center shadow-xl p-12 lg:p-24 rounded-xl">
        <div className="flex flex-col gap-16">
          <h1 className="text-[#183249] text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            Club Membership Checker
          </h1>

          <div className="text-[#183249] text-lg font-semibold opacity-90 font-sans flex flex-col gap-6">
            <p>
              {" "}
              We’re here to make membership status checking super easy for you
              and your club members.
            </p>
            <p>
              {" "}
              Simply link your club’s Google Sheet to create and customise your
              club’s checker page, and manage your data in the admin dashboard.
            </p>
            <a href="/our-team">Developed by WDCC. Meet our Team!</a>
            <a className="text-sm" href="/privacy-policy">
              Our Privacy Policy
            </a>
          </div>
          <div>
            <Button
              buttonText="Get Started!"
              width="8.8em"
              height="3.5em"
              backgroundColor="transparent"
              hoverColor="#03045E0F"
              color="#03045E"
              border="3px solid #03045E"
              fontWeight="600"
              fontSize="1.2em"
              onClick={handleButtonClick}
            />
          </div>
        </div>

        <img
          className="top-[7em] w-auto h-[30em]"
          src={femaleProgrammer}
          alt=""
        />
      </div>
    </div>
  );
};