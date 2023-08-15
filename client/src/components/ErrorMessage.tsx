import errorIcon from '../assets/ErrorIcon.svg';

interface ErrorMessageProps {
  isError?: boolean;
  errorText?: string;
}

const ErrorMessage = ({ errorText, isError }: ErrorMessageProps) => {
  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '1rem',
        fontFamily: 'Montserrat',
        height: '18px',
        marginTop: '5px',
      }}>
      <img
        src={isError ? errorIcon : ''}
        style={{ float: 'left', marginRight: '8px' }}></img>
      <span
        style={{
          fontSize: '75%',
          color: 'red',
          float: 'left',
        }}>
        {isError ? errorText : ''}
      </span>
    </div>
  );
};

export default ErrorMessage;
