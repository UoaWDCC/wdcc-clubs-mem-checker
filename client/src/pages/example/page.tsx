import styles from './style.module.css';
import { useNavigate } from 'react-router';

export const ExamplePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };
  return (
    <div>
      <title>Example Page</title>
      <p>You are on example page</p>
      <button onClick={handleButtonClick}>Go to index</button>
    </div>
  );
};
