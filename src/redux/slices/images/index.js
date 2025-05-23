// ** Redux
import { createSlice } from "@reduxjs/toolkit";

const InitialStates = {};

export const imageSlice = createSlice({
  name: "images",
  initialState: InitialStates,
  reducers: {},
});

export const {} = imageSlice.actions;

export default imageSlice.reducer;
