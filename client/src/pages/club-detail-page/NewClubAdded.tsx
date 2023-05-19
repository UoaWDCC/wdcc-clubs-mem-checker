import Button from '../../components/Button';
import styles from './style.module.css';
import { ClubDetails } from './ClubDetailPage';
import { useNavigate } from 'react-router';

interface NewClubAddedProps {
	clubDetails: ClubDetails;
}

const NewClubAdded = ({ clubDetails }: NewClubAddedProps) => {
	const navigate = useNavigate();
	const handleOnClick = () => {
		navigate('/create-page', { state: { acronym: clubDetails.clubAcronym } });
	};
	return (
		<div className={`${styles.container} ${styles['new-club']}`}>
			<div id={styles.backButton}></div>
			<div>
				<h1 id={styles.title}>new club added!</h1>
			</div>
			<div id={styles.message}>
				your club{' '}
				<span style={{ fontWeight: 'bold' }}>'{clubDetails.clubName}'</span> has
				been successfully created and added to your user account.
			</div>
			<div className={styles.body} style={{ alignItems: 'center' }}></div>
			<div>
				<div id={styles.instruction}>
					please proceed to creating a membership checker page for{' '}
					{clubDetails.clubAcronym}
				</div>
				<Button
					buttonText="next"
					onClick={handleOnClick}
					width="9rem"
					height="3rem"
					fontSize="1.2rem"
					margin="1rem 0 0 0"
				/>
			</div>
		</div>
	);
};

export default NewClubAdded;
