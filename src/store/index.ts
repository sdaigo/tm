import { configureStore } from "@reduxjs/toolkit";
import { timerMiddleware } from "./middleware/timer.middleware";
import timerReducer from "./slices/timer.slice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
