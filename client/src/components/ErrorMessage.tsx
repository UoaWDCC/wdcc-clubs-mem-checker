import errorIcon from "../assets/ErrorIcon.svg";

interface ErrorMessageProps {
  isError?: boolean;
  errorText?: string;
}

const ErrorMessage = ({ errorText, isError }: ErrorMessageProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 5fr",
        placeItems: "center start",
        width: "10rem",
        paddingLeft: "1rem",
        fontFamily: "Montserrat",
      }}
    >
      <img src={isError ? errorIcon : ""} height="70%"></img>
      <span style={{ fontSize: "75%", color: "red" }}>
        {isError ? errorText : ""}
      </span>
    </div>
  );
};

export default ErrorMessage;
