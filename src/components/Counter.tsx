import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const onClickHandler = () => setCount(count + 1);
  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={onClickHandler}>Click Me!</button>
      <p>Fix Me! (The Counter will not change)</p>
    </div>
  );
};

export default Counter;
