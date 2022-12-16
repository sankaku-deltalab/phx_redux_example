import * as React from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {selectValue, increment, decrement, incrementByAmount} from '../features/example/exampleSlice';

const ExampleCounter: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const [incAmount, setIncAmount] = React.useState(0);

  const handleInc = () => {
    dispatch(increment());
  };

  const handleDec = () => {
    dispatch(decrement());
  };

  const handleIncAmount = () => {
    dispatch(incrementByAmount(incAmount));
    setIncAmount(0);
  };

  return (
    <div style={{margin: 10, border: 'solid'}}>
      <div>This is react element</div>
      <div>count: {value}</div>
      <button onClick={handleInc}>Inc by client</button>
      <button onClick={handleDec}>Dec by client</button>
      <div style={{margin: 10}}>
        <input type="number" value={incAmount} onChange={e => setIncAmount(parseInt(e.target.value))} />
        <button onClick={handleIncAmount}>Inc with amount by client</button>
      </div>
    </div>
  );
};

export default ExampleCounter;
