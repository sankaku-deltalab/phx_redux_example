import * as React from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {selectValue, increment, decrement} from '../features/example/exampleSlice';

const ExampleCounter: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);

  const handleInc = () => {
    dispatch(increment());
  };

  const handleDec = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <div>count: {value}</div>
      <button onClick={handleInc}>Inc by client</button>
      <button onClick={handleDec}>Dec by client</button>
    </div>
  );
};

export default ExampleCounter;
