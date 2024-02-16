import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { createAPI } from "../services/api";

// export const store = configureStore({reducer});

// export const store = configureStore({
//   reducer: reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// })

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});
