import styles from './Link.module.css';
import { getTextColor, lightenColor } from '../utils/helpers';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps {
  height?: string;
  width?: string;
  linkText: string;
  margin?: string;
  backgroundColor?: string;
  border?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  iconSize?: string;
  href: string;
}

const Link = ({
  height,
  width,
  linkText,
  margin,
  backgroundColor = '#087DF1',
  border = backgroundColor,
  fontSize = '1rem',
  fontWeight = 'bold',
  icon,
  iconSize,
  href,
}: LinkProps) => {
  return (
    <>
      <RouterLink
        className={styles.link}
        style={{
          height,
          width,
          margin,
          backgroundColor,
          border,
          color: getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          ['--background-color' as any]: lightenColor(backgroundColor, 30),
        }}
        to={href}
      >
        <div
          className={icon ? styles.linkContent : ''}
          style={{
            width: '80%',
            margin: 'auto',
          }}
        >
          <img
            src={icon}
            height={iconSize}
          />
          {linkText}
        </div>
      </RouterLink>
    </>
  );
};

export default Link;
