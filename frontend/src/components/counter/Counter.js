import React from "react";
import { decrement, increment, selectValue } from "../../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
const Counter = ({ initialCount = 0 }) => {
  const dispatch = useDispatch();
  const value = useSelector(selectValue);

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{value}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};

export default Counter;
