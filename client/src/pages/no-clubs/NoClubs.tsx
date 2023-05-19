import Link from '../../components/Link';
import { useState, useEffect } from 'react';
import GoogleLogo from '../../assets/google-logo.svg';
import styles from './style.module.css';
import Button from '../../components/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function NoClubs() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('friend');
	useEffect(() => {
		const fetchData = async () => {
			const res = await axios({
				url: '/firstname',
			});
			setFirstName(res.data.firstName);
		};
		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles['text-div']}>
				<p className={styles['no-clubs']}>
					hi {firstName}, there are currently no clubs linked to your account.
				</p>
				<p className={styles.subtext}>
					please select one of the following options
				</p>
			</div>
			<div className={styles['button-div']}>
				<Button
					width="240px"
					height="55px"
					buttonText="create club"
					fontSize="1.1rem"
					fontWeight="500"
					backgroundColor="#03045E"
					onClick={() => navigate('/club-details')}
				/>
				<Button
					width="240px"
					height="55px"
					buttonText="join as club admin"
					fontSize="1.1rem"
					fontWeight="500"
					backgroundColor="#087DF1"
					color="#03045E"
					border="0.2rem solid #03045E"
					onClick={() => navigate('/invite-code')}
				/>
			</div>
		</div>
	);
}
