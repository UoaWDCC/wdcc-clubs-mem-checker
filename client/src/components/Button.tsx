import styles from './Button.module.css';
import { getTextColor, lightenColor } from '../utils/helpers';
import React from 'react';

export interface ButtonProps {
  height?: string;
  width?: string;
  buttonText: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  iconFromIconsax?: React.ReactNode;
  iconSize?: string;
  borderRadius?: string;
  hoverColor?: string;
  onClick: () => void;
}

const Button = ({
  height,
  width,
  buttonText,
  margin,
  color,
  backgroundColor = '#087DF1',
  border = backgroundColor,
  fontSize = '1rem',
  fontWeight = 'bold',
  icon,
  iconSize,
  iconFromIconsax,
  borderRadius = '8px',
  hoverColor = '',
  onClick,
}: ButtonProps) => {
  if (hoverColor == '') hoverColor = lightenColor(backgroundColor, 20);
  return (
    <>
      <button
        className={styles.button}
        style={{
          height,
          width,
          margin,
          backgroundColor,
          border,
          color: color || getTextColor(backgroundColor),
          fontSize,
          fontWeight,
          borderRadius: borderRadius,
          ['--hover-color' as any]: hoverColor,
        }}
        onClick={onClick}
      >
        <div
          className={icon ? styles.buttonContent : ''}
          style={{
            width: '80%',
            margin: 'auto',
          }}
        >
          {!iconFromIconsax && (
            <>
              <img
                src={icon}
                height={iconSize}
              /> 
              {buttonText}
            </>
          )}
        </div>
        <div className={iconFromIconsax ? styles.buttonContent : ''} style={{ width: '100%', margin: 'auto' }}>
          {iconFromIconsax && (
            <>
              {iconFromIconsax && React.isValidElement(iconFromIconsax) && React.cloneElement(iconFromIconsax as React.ReactElement, { size: `${parseFloat(height || '0') * 0.5}px`, color: color, style: { strokeWidth: '5'}, })}
              {buttonText}
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
