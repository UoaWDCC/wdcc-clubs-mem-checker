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
  padding?: string;
  translateX?: string;
  translateY?: string;
  onClick: () => void;
}

const Button = ({
  height,
  width,
  buttonText,
  margin,
  color,
  backgroundColor = "#087DF1",
  border = backgroundColor,
  fontSize = "1rem",
  fontWeight = "bold",
  icon,
  iconSize,
  iconFromIconsax,
  borderRadius = '8px',
  hoverColor = '',
  padding = "5px",
  onClick,
  translateX,
  translateY,
}: ButtonProps) => {
  if (hoverColor == "") hoverColor = lightenColor(backgroundColor, 20);
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
          padding: padding,
          ['--hover-color' as any]: hoverColor,
        }}
        onClick={onClick}
      >
        <div
          className={icon ? styles.buttonContent : ""}
          style={{
            width: "80%",
            margin: "auto",
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
        <div className={iconFromIconsax ? styles.buttonContent : ''} style={{ width: '100%', margin: "auto"}}>
          {iconFromIconsax && (
            <>
              {iconFromIconsax && React.isValidElement(iconFromIconsax) && React.cloneElement(iconFromIconsax as React.ReactElement, { size: iconSize, color: color, style: {transform: `translate(${translateX}, ${translateY})`}})}
              {buttonText}
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
