// ** Redux
import { createSlice } from "@reduxjs/toolkit";

const InitialStates = {};

export const adminSlice = createSlice({
  name: "admins",
  initialState: InitialStates,
  reducers: {},
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
