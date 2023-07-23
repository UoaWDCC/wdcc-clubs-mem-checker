import { useState } from "react";
import { Page } from "../../create-checker-page/CreateCheckerPage";
import EmptyClubLogo from "../../../assets/EmptyClubLogo.svg";
import styles from "./SelectClubDropdown.module.css";

interface SelectClubDropdownProps {
  clubs: Club[];
}

interface Club {
  id: number;
  name: string;
  logo?: string;
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
      style={{
        width: "250px",
        backgroundColor: "#EAF7FA",
        borderRadius: "8px",
      }}
    >
      <div
        className={styles.clubCard}
        style={{ height: clubCardHeight }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className={styles.logo}
          style={{ border: "3px solid #E0E0E0" }}
          src={selectedClub.logo || EmptyClubLogo}
        />
        <p className={styles.text}>{selectedClub.name}</p>
      </div>
      {isOpen && (
        <div
          className={styles.dropdownContainer}
          style={{ maxHeight: 3 * clubCardHeight }}
        >
          {clubs.map((club) => (
            <div
              className={styles.clubCard}
              style={{ height: clubCardHeight }}
              onClick={() => handleSelectClub(club)}
            >
              <img
                className={styles.logo}
                src={selectedClub.logo || EmptyClubLogo}
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
