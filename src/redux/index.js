// Redux Import
import { configureStore } from "@reduxjs/toolkit";

// Middleware Imports
import { slices } from "./app/slice";
import { ErrorHandler } from "./middleware/error";
import { SuccessHandler } from "./middleware/success";

// Reducers Imports
import users from "./slices/users";
import procedures from "./slices/procedures";

const store = configureStore({
  reducer: {
    users,
    procedures,
    [slices.reducerPath]: slices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(slices.middleware)
      .concat(ErrorHandler)
      .concat(SuccessHandler),
});

export default store;
