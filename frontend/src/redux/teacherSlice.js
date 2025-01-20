import { createSlice } from "@reduxjs/toolkit";

const init = {
  name: "",
  lang: "en-En",
  value: 0,
};
const teacherSlice = createSlice({
  name: "teacher",
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

export default teacherSlice.reducer;
export const { increment, decrement } = teacherSlice.actions;
export const selectValue = (state) => state.teacher.value;
