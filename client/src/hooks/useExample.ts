import { useState, useEffect } from 'react';

export const useExample = (startingValue: number): [number, Function] => {
  const [value, setValue] = useState(startingValue);
  useEffect(() => {
    console.log(`You have changed the value to ${value}`);
  }, [value]);
  return [value, setValue];
};
