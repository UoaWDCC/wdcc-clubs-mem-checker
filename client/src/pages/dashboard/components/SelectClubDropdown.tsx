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
import styles from './SelectClubDropdown.module.css';
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
      className={styles.outerContainer}
      style={{ backgroundColor: `${isOpen ? '#d6ebf0' : 'transparent'}` }}
    >
      <div
        className={styles.clubCard}
        style={{
          backgroundColor: '#DAF6FC',
          borderRadius: '20px',
        }}
      >
        <img
          className={styles.logo}
          style={{ border: '3px solid #E0E0E0' }}
          src={
            dashboard.selectedClub.logo
              ? dashboard.selectedClub.logo
              : EmptyClubLogo
          }
        />
        <p className={styles.text}>{dashboard.selectedClub.name}</p>
        {renderDropdownArrow}
      </div>
      {isOpen && (
        <div
          className={styles.dropdownContainer}
          style={{
            maxHeight: `${3 * clubCardHeight}px`,
            width: `${clubCardWidth}px`,
          }}
        >
          <div
            className={styles.clubCard}
            style={{ height: clubCardHeight }}
            onClick={() => navigate('/club-details')}
          >
            <div className={styles.createClubIcon}>
              <img
                style={{ width: '30px' }}
                src={CreateClub}
              />
            </div>
            <p className={styles.text}>Create New Club</p>
          </div>
          <div
            className={styles.clubCard}
            style={{ height: clubCardHeight }}
            onClick={() => navigate('/invite-code')}
          >
            <div className={styles.createClubIcon}>
              <img
                style={{ width: '30px' }}
                src={JoinClub}
              />
            </div>
            <p className={styles.text}>Join Club</p>
          </div>
          <hr
            style={{
              height: '0.25rem',
              border: 'none',
              backgroundColor: '#D9D9D9',
              margin: '0.2rem',
              borderRadius: '0.4rem',
            }}
          />

          {clubs.map((club) => (
            <div
              className={styles.clubCard}
              style={{ height: clubCardHeight, cursor: 'pointer' }}
              onClick={() => handleSelectClub(club)}
              key={club.id}
            >
              <img
                className={styles.logo}
                src={club.logo || EmptyClubLogo}
              />
              <p className={styles.text}>{club.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectClubDropdown;
