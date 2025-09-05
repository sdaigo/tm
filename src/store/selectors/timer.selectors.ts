import { createSelector } from "@reduxjs/toolkit";
import { getProgressRatio, getRemainingSeconds } from "@/core/timer";
import {
  formatProgress,
  formatTime,
} from "@/shell/ui/formatters/time.formatter";
import type { RootState } from "../index";

// Base selector
const selectTimer = (state: RootState) => state.timer.timer;

// Memoized selectors for UI
export const selectTimerStatus = createSelector(
  selectTimer,
  (timer) => timer.status,
);

export const selectElapsedSeconds = createSelector(
  selectTimer,
  (timer) => timer.elapsedSeconds,
);

export const selectTargetSeconds = createSelector(
  selectTimer,
  (timer) => timer.targetSeconds,
);

export const selectRemainingSeconds = createSelector(selectTimer, (timer) =>
  getRemainingSeconds(timer),
);

export const selectProgress = createSelector(selectTimer, (timer) =>
  getProgressRatio(timer),
);

// Formatted values for display
export const selectElapsedFormatted = createSelector(
  selectElapsedSeconds,
  (elapsed) => formatTime(elapsed),
);

export const selectRemainingFormatted = createSelector(
  selectRemainingSeconds,
  (remaining) => formatTime(remaining),
);

export const selectTargetFormatted = createSelector(
  selectTargetSeconds,
  (target) => formatTime(target),
);

// UI control states
export const selectCanStart = createSelector(
  selectTimerStatus,
  (status) => status === "idle" || status === "completed",
);

export const selectCanPause = createSelector(
  selectTimerStatus,
  (status) => status === "running",
);

export const selectCanResume = createSelector(
  selectTimerStatus,
  (status) => status === "paused",
);

export const selectCanStop = createSelector(
  selectTimerStatus,
  (status) => status !== "idle",
);

// Progress display values
export const selectProgressBarWidth = createSelector(
  selectProgress,
  (progress) => Math.floor(progress * 100), // Returns 0-100 for percentage
);

export const selectProgressPercentage = createSelector(
  selectProgress,
  (progress) => formatProgress(progress),
);
