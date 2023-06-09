import Background from '../../components/Background';
import styles from './InviteCodePage.module.css';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import WhiteBackButton from '../../components/WhiteBackButton';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useRef, useState } from 'react';

const InviteCodePage = () => {
	const navigate = useNavigate();

	const inviteCode = useRef<HTMLInputElement>(null);
	const [inviteCodeError, setInviteCodeError] = useState<boolean>(false);
	const handleOnBack = () => {
		navigate('/no-clubs');
	};
	const handleOnNext = () => {
		const url =
			'http://localhost:3000/club/verify-invite-code/' +
			inviteCode.current?.value;
		axios
			.get(url)
			.then(function (response) {
				if (response.status === 200) {
					console.log(response.data);
					navigate('/dashboard');
				}
			})
			.catch(function (error) {
				setInviteCodeError(true);
				console.log(error);
			});
	};
	return (
		<Background>
			<div className={styles.container}>
				<div className={styles['back-btn']}>
					<WhiteBackButton color="white" onClick={handleOnBack} />
				</div>
				<div className={styles.title}>
					<h1>enter invite code</h1>
				</div>
				<i className={styles.subtitle}>
					please enter the invite code sent by an existing club admin
				</i>
				<div className={styles.textfield}>
					<Textfield
						margin="0 0 0.5rem 0"
						backgroundColor="#ffffff"
						height="3.6rem"
						placeholder="enter code here"
						fontSize="1.3rem"
						width="100%"
						placeholderTextAlign="center"
						ref={inviteCode}
						isError={inviteCodeError}
						onChange={() => setInviteCodeError(false)}
					/>
					{inviteCodeError && (
						<>
							<div className={styles['error-arrow']}></div>
							<div className={styles['error-box']}>invalid code</div>
						</>
					)}
				</div>

				<p className={styles.body}>
					if you don't know what this is, please contact one of your club's
					admins with an existing account in our system and ask them to share an
					invite code with you.
				</p>
				<Button
					buttonText="submit"
					onClick={handleOnNext}
					backgroundColor="#03045E"
					width="8rem"
					height="3.2rem"
				/>
			</div>
		</Background>
	);
};

export default InviteCodePage;
