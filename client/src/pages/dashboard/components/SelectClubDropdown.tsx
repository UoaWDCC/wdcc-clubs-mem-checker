import { useState } from "react";
import EmptyClubLogo from "../../../assets/EmptyClubLogo.svg";
import styles from "./SelectClubDropdown.module.css";
import { ArrowDown2 } from "iconsax-react";

interface SelectClubDropdownProps {
  clubs: Club[];
}

interface Club {
  id: number;
  name: string;
  logo?: File;
}

const SelectClubDropdown = ({ clubs }: SelectClubDropdownProps) => {
  // try to retrieve selected club, if null, use first club in clubs array
  const cachedClub = localStorage.getItem("selectedClub");
  const [selectedClub, setSelectedClub] = useState<Club>(
    cachedClub ? JSON.parse(cachedClub) : clubs[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectClub = (club: Club) => {
    setIsOpen(!isOpen);
    localStorage.setItem("selectedClub", JSON.stringify(club));
    setSelectedClub(club);
  };

  const clubCardHeight = 60;
  return (
    <div
      className={styles.outerContainer}
      style={isOpen ? { backgroundColor: "#d6ebf0" } : {}}
    >
      <div
        className={styles.clubCard}
        style={{
          height: clubCardHeight,
          backgroundColor: "#e8f7fb",
          borderRadius: "8px",
        }}
      >
        <img
          className={styles.logo}
          style={{ border: "3px solid #E0E0E0" }}
          src={
            selectedClub.logo
              ? URL.createObjectURL(selectedClub.logo)
              : EmptyClubLogo
          }
        />
        <p className={styles.text}>{selectedClub.name}</p>
        <ArrowDown2
          color="#000000"
          size={28}
          variant="Bold"
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <div
          className={styles.dropdownContainer}
          style={{ maxHeight: `${3 * clubCardHeight}px` }}
        >
          {clubs.map((club) => (
            <div
              className={styles.clubCard}
              style={{ height: clubCardHeight, cursor: "pointer" }}
              onClick={() => handleSelectClub(club)}
            >
              <img
                className={styles.logo}
                src={club.logo ? URL.createObjectURL(club.logo) : EmptyClubLogo}
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
