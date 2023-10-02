import { getTextColor, lightenColor } from '../utils/helpers';
import styles from './Textfield.module.css';
import ErrorMessage from './ErrorMessage';
import { forwardRef } from 'react';

interface TextfieldProps {
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  textColour?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  placeholder?: string;
  label?: string;
  isError?: boolean;
  errorText?: string;
  icon?: string;
  iconSize?: string;
  textAlign?: string;
  onKeyUp?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
}

const Textfield = forwardRef(
  (
    {
      height,
      width = '12rem',
      margin,
      padding,
      backgroundColor = '#e0e0e0',
      textColour,
      fontSize,
      fontFamily,
      fontWeight,
      placeholder,
      label,
      isError,
      errorText,
      icon,
      iconSize = '1rem',
      onKeyUp,
      onKeyDown,
      onChange,
      onFocus,
      textAlign = 'left',
      readOnly,
    }: TextfieldProps,
    ref: any
  ) => {
    const iconStyles = icon
      ? {
          backgroundImage: `url(${icon})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: iconSize,
          backgroundPosition: '10px',
          paddingLeft: icon ? `calc(${iconSize} + 1rem)` : '1rem',
        }
      : {};
    textColour = textColour ? textColour : getTextColor(backgroundColor);

    return (
      <div style={{ margin, width }}>
        <label>{label}</label>
        <div>
          <input
            ref={ref}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            className={styles.input}
            onChange={onChange}
            onFocus={onFocus}
            readOnly={readOnly}
            placeholder={placeholder}
            style={{
              height,
              width,
              padding,
              backgroundColor,
              color: textColour,
              fontSize,
              fontFamily,
              fontWeight,
              border: isError
                ? '2.5px solid #f58693'
                : `2px solid ${backgroundColor}`,
              ['--focus-border-color' as any]: lightenColor(
                backgroundColor,
                -75
              ),
              ['--placeholder-color' as any]: getTextColor(backgroundColor),
              ['--text-align' as any]: textAlign,

              ...iconStyles,
            }}
          />
        </div>
        {errorText && <ErrorMessage isError={isError} errorText={errorText} />}
      </div>
    );
  }
);

export default Textfield;
