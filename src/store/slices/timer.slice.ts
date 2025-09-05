import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createEmptyTimer,
  DEFAULT_TARGET_SECONDS,
  pauseTimer,
  resumeTimer,
  setTargetSeconds as setTarget,
  startTimer,
  stopTimer,
  type Timer,
  tickTimer,
} from "@/core/timer";

// State management layer - owned by Redux store
// This is where the actual state lives, not in core
export interface TimerState {
  timer: Timer;
}

// Initial state is managed here, not in core
const initialState: TimerState = {
  timer: createEmptyTimer(DEFAULT_TARGET_SECONDS),
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // Actions delegate to pure functions from core
    start: (state) => {
      state.timer = startTimer(state.timer, Date.now());
    },

    pause: (state) => {
      state.timer = pauseTimer(state.timer, Date.now());
    },

    resume: (state) => {
      state.timer = resumeTimer(state.timer, Date.now());
    },

    stop: (state) => {
      state.timer = stopTimer(state.timer);
    },

    tick: (state) => {
      state.timer = tickTimer(state.timer, Date.now());
    },

    setTargetSeconds: (state, action: PayloadAction<number>) => {
      state.timer = setTarget(state.timer, action.payload);
    },

    reset: (state) => {
      state.timer = createEmptyTimer(DEFAULT_TARGET_SECONDS);
    },
  },
});

export const { start, pause, resume, stop, tick, setTargetSeconds, reset } =
  timerSlice.actions;

export default timerSlice.reducer;
