import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import EmptyClubLogo from '../../../assets/EmptyClubLogo.svg';
import { ArrowDown2, ArrowUp2, Cloud, CloudPlus } from 'iconsax-react';
import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';
import IDropdownClub from '../../../types/IDropdownClub';
import CreateClub from '../../../assets/create-icon.svg';
import JoinClub from '../../../assets/join-group.svg';

interface SelectClubDropdownProps {
  clubs: IDropdownClub[];
}

// NEED TO ADD HOVER COLOUR
const SelectClubDropdown = ({ clubs }: SelectClubDropdownProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // retrieve context
  const [dashboard, setDashboard] = useContext(DashboardContextProvider) as [
    IDashboardContext,
    Dispatch<SetStateAction<IDashboardContext>>
  ];

  if (!dashboard.selectedClub) {
    dashboard.selectedClub = clubs[0];
  }

  const handleSelectClub = (club: IDropdownClub) => {
    setIsOpen(!isOpen);
    localStorage.setItem('selectedClub', JSON.stringify(club));
    setDashboard({ ...dashboard, selectedClub: club });
  };

  const outerContainerRef = useRef<HTMLInputElement>(null);
  // Function to close the dropdown when clicking outside of it
  const closeDropdownOnOutsideClick = (event: MouseEvent) => {
    // Check if the clicked element is not inside the dropdown or the club card
    if (
      outerContainerRef.current &&
      !outerContainerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Attach the event listener when the component mounts
  useEffect(() => {
    document.addEventListener('mousedown', closeDropdownOnOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', closeDropdownOnOutsideClick);
    };
  }, []);

  const clubCardHeight = 100;

  const [clubCardWidth, setClubCardWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => {
      setClubCardWidth(outerContainerRef.current?.offsetWidth || 0);
    };

    // Initial width update
    updateWidth();

    // Update width when the window is resized
    window.addEventListener('resize', updateWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const renderDropdownArrow = isOpen ? (
    <ArrowUp2
      color="#000000"
      size={28}
      variant="Bold"
      style={{ cursor: 'pointer', marginLeft: 'auto' }}
      onClick={() => setIsOpen(!isOpen)}
    />
  ) : (
    <ArrowDown2
      color="#000000"
      size={28}
      variant="Bold"
      style={{ cursor: 'pointer', marginLeft: 'auto' }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );

  return (
    <div
      ref={outerContainerRef}
      className="rounded-2xl w-full h-full font-display"
      style={{ backgroundColor: `${isOpen ? '#d6ebf0' : 'transparent'}` }}
    >
      <div className="bg-[#DAF6FC] rounded-2xl h-full w-full items-center gap-2 flex p-4 cursor-pointer">
        <img
          className="rounded-full h-[72px] w-[72px] border-4 border-solid border-[#E0E0E0]"
          src={
            dashboard.selectedClub.logo
              ? dashboard.selectedClub.logo
              : EmptyClubLogo
          }
        />
        <p className="text-[#03045e] font-display font-bold">
          {dashboard.selectedClub.name}
        </p>
        {renderDropdownArrow}
      </div>
      {isOpen && (
        <div
          className="bg-[#d6ebf0] rounded-2xl overflow-x-hidden absolute z-50 w-inherit"
          style={{
            maxHeight: `${3 * clubCardHeight}px`,
            width: `${clubCardWidth}px`,
          }}
        >
          <div
            className="h-full w-full items-center gap-4 flex p-4 cursor-pointer bg-[#DAF6FC]"
            style={{ height: clubCardHeight }}
            onClick={() => navigate('/club-details')}
          >
            <div className="flex flex-col justify-center items-center bg-[#d9d9d9] text-[black] w-[72px] h-[72px] rounded-full">
              <img
                style={{ width: '30px' }}
                src={CreateClub}
              />
            </div>
            <p className="text-[#03045e] font-display font-bold text-xl">
              Create New Club
            </p>
          </div>
          <div
            className="h-full w-full items-center gap-4 flex p-4 cursor-pointer bg-[#DAF6FC]"
            style={{ height: clubCardHeight }}
            onClick={() => navigate('/invite-code')}
          >
            <div className="flex flex-col justify-center items-center bg-[#d9d9d9] text-[black] w-[72px] h-[72px] rounded-full">
              <img
                style={{ width: '30px' }}
                src={JoinClub}
              />
            </div>
            <p className="text-[#03045e] font-display font-bold text-xl">
              Join Club
            </p>
          </div>
          {clubs.map((club) => (
            <div
              className="h-full w-full items-center gap-4 flex p-4 cursor-pointer bg-[#DAF6FC]"
              style={{ height: clubCardHeight, cursor: 'pointer' }}
              onClick={() => handleSelectClub(club)}
              key={club.id}
            >
              <img
                className="rounded-full h-[72px] w-[72px]"
                src={club.logo || EmptyClubLogo}
              />
              <p className="text-[#03045e] font-display font-bold text-xl overflow-hidden">
                {club.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectClubDropdown;
