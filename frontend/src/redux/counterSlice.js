import { createSlice } from "@reduxjs/toolkit";

const init = {
  value: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState: init,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;
export const selectValue = (state) => state.counter.value;
