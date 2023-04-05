import styles from './Counter.module.css';
import { useState } from 'react';
import { useExample } from '../../hooks/useExample';

export default function Counter() {
  const [count, setCount] = useExample(0);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.container}>
      <p className={styles.count}>{count}</p>
      <button onClick={handleButtonClick}>+1</button>
    </div>
  );
}
