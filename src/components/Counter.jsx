import { useState } from "react";

// Démo TP3 : variable ordinaire VS état React (non utilisé dans App)
export const Counter = () => {
  // let count = 0;  // ne met PAS à jour l'interface
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </>
  );
};
