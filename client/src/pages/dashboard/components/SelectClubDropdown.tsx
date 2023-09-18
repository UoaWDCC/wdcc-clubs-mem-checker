import {
  Dispatch,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import EmptyClubLogo from '../../../assets/EmptyClubLogo.svg';
import styles from './SelectClubDropdown.module.css';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import { DashboardContextProvider } from '../Dashboard';
import IDashboardContext from '../../../types/IDashboardContext';
import IDropdownClub from '../../../types/IDropdownClub';

interface SelectClubDropdownProps {
  clubs: IDropdownClub[];
}

// NEED TO ADD HOVER COLOUR
const SelectClubDropdown = ({ clubs }: SelectClubDropdownProps) => {
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

  const clubCardHeight = 60;

  const clubCardRef = useRef<HTMLInputElement>(null);
  const [clubCardWidth, setClubCardWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => {
      setClubCardWidth(clubCardRef.current?.offsetWidth || 0);
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

  // if no clubs attached to user
  if (clubs.length == 0) {
    return (
      <div className={styles.outerContainer}>
        <div
          className={styles.clubCard}
          style={{
            backgroundColor: '#e8f7fb',
            borderRadius: '8px',
            justifyContent: 'center',
          }}
        >
          <p className={styles.text}>No Clubs Registered</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.outerContainer}
      style={{ backgroundColor: `${isOpen ? '#d6ebf0' : 'transparent'}` }}
    >
      <div
        ref={clubCardRef}
        className={styles.clubCard}
        style={{
          backgroundColor: '#e8f7fb',
          borderRadius: '8px',
        }}
      >
        <img
          className={styles.logo}
          style={{ border: '3px solid #E0E0E0' }}
          src={
            // dashboard.selectedClub.logo
            //   ? URL.createObjectURL(dashboard.selectedClub.logo)
            //   : EmptyClubLogo
            EmptyClubLogo
          }
        />
        <p className={styles.text}>{dashboard.selectedClub.name}</p>
        {isOpen ? (
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
        )}
      </div>
      {isOpen && (
        <div
          className={styles.dropdownContainer}
          style={{
            maxHeight: `${3 * clubCardHeight}px`,
            width: `${clubCardWidth}px`,
          }}
        >
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
