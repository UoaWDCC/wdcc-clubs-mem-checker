import styles from './Background.module.css';

interface BackgroundProps {
	children?: React.ReactNode;
}
const Background = ({ children }: BackgroundProps) => {
	return <div className={styles.background}>{children}</div>;
};

export default Background;
