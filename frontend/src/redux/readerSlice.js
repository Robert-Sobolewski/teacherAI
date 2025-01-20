import { createSlice } from "@reduxjs/toolkit";

const init = {
  value: 0,
};
const readerSlice = createSlice({
  name: "reader",
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

export default readerSlice.reducer;
export const { increment, decrement } = readerSlice.actions;
export const selectValue = (state) => state.counter.value;
