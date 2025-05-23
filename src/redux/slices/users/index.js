// ** Redux
import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../../utils/LocalStorage";

const InitialStates = {
  users: {},
  token: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: InitialStates,
  reducers: {
    setUserDetails: (state, { payload }) => {
      LocalStorage.setStringify("users", payload);

      return {
        ...state,
        users: payload,
      };
    },
    setToken: (state, { payload }) => {
      LocalStorage.set("token", payload);

      return {
        ...state,
        token: payload,
      };
    },
    logout: () => {
      LocalStorage.remove("token");
      return InitialStates;
    },
  },
});

export const { setUserDetails, setToken, logout } = usersSlice.actions;

export default usersSlice.reducer;
