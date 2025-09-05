import type { Middleware } from "@reduxjs/toolkit";
import { pause, resume, start, stop, tick } from "../slices/timer.slice";

export const timerMiddleware: Middleware = (store) => (next) => {
  let intervalId: Timer | null = null;

  return (action) => {
    const result = next(action);

    // Handle side effects based on actions
    if (start.match(action) || resume.match(action)) {
      // Start ticking
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = setInterval(() => {
        store.dispatch(tick());
      }, 1000);
    } else if (pause.match(action) || stop.match(action)) {
      // Stop ticking
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    } else if (tick.match(action)) {
      // Check if timer completed
      const state = store.getState();
      if (state.timer.timer.status === "completed" && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    return result;
  };
};
