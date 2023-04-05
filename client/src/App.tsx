import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Counter from './components/example/Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="">Vite + React</h1>
      <div className="card">
        <Counter />
        <p className="">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
