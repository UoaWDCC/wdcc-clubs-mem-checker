import styles from './style.module.css';
import femaleProgrammer from '../../assets/femaleProgrammer.svg';
import { useNavigate } from 'react-router';
import Button from '../../components/Button';

export const HomePage = () => {
	const navigate = useNavigate();
	const handleButtonClick = () => {
		navigate('/sign-in');
	};
	return (
		<div className={styles['home-container']}>
			<title>Club Membership Checker</title>
			<div className={styles['content-container']}>
				<div className={styles['col-1']}>
					<h1 className={styles.title}>Club Membership Checker</h1>
					<div>
						<p className={styles.paragraph}>
							we're here to make membership status checking super easy for you
							and your club members. <br />
							<br />
							simply link your club's Google Sheet to create and customise your
							club's checker page, and manage your data in the admin dashboard.
						</p>
					</div>
					<div className={styles['intro-button']}>
						<Button
							buttonText="get started!"
							width="205px"
							height="80px"
							color="#03045E"
							backgroundColor="#FFD166"
							border="None"
							fontWeight="600"
							fontSize="23px"
							onClick={handleButtonClick}
						/>
					</div>
				</div>

				<img
					className={styles['female-programmer']}
					src={femaleProgrammer}
					alt=""
				/>
			</div>
		</div>
	);
};
