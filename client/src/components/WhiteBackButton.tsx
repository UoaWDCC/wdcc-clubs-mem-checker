import WhiteBackArrow from '../assets/WhiteBackArrowBorder.svg';
import BlueBackArrow from '../assets/BlueBackArrowBorder.svg';
import styles from './WhiteBackButton.module.css';

interface WhiteBackButtonProps {
	color: 'white' | 'blue';
	onClick: () => void;
}

const WhiteBackButton = ({ color, onClick }: WhiteBackButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}>
			<img
				src={color === 'white' ? WhiteBackArrow : BlueBackArrow}
				alt="back arrow"
				height="50px"
			/>
		</button>
	);
};

export default WhiteBackButton;
