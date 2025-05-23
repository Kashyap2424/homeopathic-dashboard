// ** Redux
import { createSlice } from "@reduxjs/toolkit";

const InitialStates = {};

export const productsSlice = createSlice({
  name: "products",
  initialState: InitialStates,
  reducers: {},
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
