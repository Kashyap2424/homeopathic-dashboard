// ** Redux
import { createSlice } from "@reduxjs/toolkit";

const InitialStates = {};

export const proceduresSlice = createSlice({
    name: "procedures",
    initialState: InitialStates,
    reducers: {},
});

export const { } = proceduresSlice.actions;

export default proceduresSlice.reducer;
