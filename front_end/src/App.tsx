import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import IoTenheter from './components/IoTenheter';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
  
      {/* Legg til IoTenheter-komponenten her */}
      <IoTenheter />
    </>
  );
}

export default App;
