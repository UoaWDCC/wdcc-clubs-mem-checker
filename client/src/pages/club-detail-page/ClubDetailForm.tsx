import styles from './style.module.css';
import BackArrow from '../../assets/BackArrow.svg';
import { useRef, useState } from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import { ClubDetails } from './ClubDetailPage';
import axios from 'axios';
import { useNavigate } from 'react-router';
import WhiteBackButton from '../../components/WhiteBackButton';

const url = '/club/create'; //temp url

interface ClubDetailFormProps {
	onNext: (clubDetails: ClubDetails) => void;
}

const ClubDetailForm = ({ onNext }: ClubDetailFormProps) => {
	const navigate = useNavigate();

	const clubNameRef = useRef<HTMLInputElement>(null);
	const clubAcronymRef = useRef<HTMLInputElement>(null);
	const [clubNameError, setClubNameError] = useState(false);
	const [clubAcronymError, setClubAcronymError] = useState(false);

	const [clubNameErrorMessage, setClubNameErrorMessage] =
		useState('enter club name');

	const handleOnClick = () => {
		if (clubNameRef.current?.value === '') {
			setClubNameErrorMessage('enter club name');
			setClubNameError(true);
		}
		if (clubAcronymRef.current?.value === '') {
			setClubAcronymError(true);
		}
		if (
			clubNameRef.current?.value !== '' &&
			clubAcronymRef.current?.value !== ''
		) {
			axios
				.post(url, {
					clubName: clubNameRef.current?.value,
					clubAcronym: clubAcronymRef.current?.value,
				})
				.then(function (response) {
					if (response.status === 200) {
						console.log(response.data);
						onNext({
							clubName: clubNameRef.current?.value!,
							clubAcronym: clubAcronymRef.current?.value!,
						});
					}
				})
				.catch(function (error) {
					setClubNameErrorMessage('the club you want to create already exists');
					setClubNameError(true);
				});
		}
	};
	const handleOnBack = () => {
		navigate('/no-clubs');
	};

	return (
		<div className={styles.container}>
			<div id={styles.backButton}>
				<WhiteBackButton color="blue" onClick={handleOnBack} />
			</div>
			<h1 id={styles.title}>club details</h1>
			<div id={styles.description}>
				please fill out your club details to enter you club into our system
			</div>
			<Textfield
				width="100%"
				height="4rem"
				fontSize="1.3rem"
				placeholder="club name"
				ref={clubNameRef}
				onChange={() => setClubNameError(false)}
				isError={clubNameError}
				errorText={clubNameErrorMessage}
			/>
			<Textfield
				margin="0.5rem 0 2rem 0"
				width="100%"
				height="4rem"
				fontSize="1.3rem"
				placeholder="club acronym"
				ref={clubAcronymRef}
				onChange={() => setClubAcronymError(false)}
				isError={clubAcronymError}
				errorText="enter club acronym"
			/>
			<Button
				buttonText="confirm"
				onClick={handleOnClick}
				width="9rem"
				height="3rem"
				fontSize="1.2rem"
			/>
		</div>
	);
};

export default ClubDetailForm;
