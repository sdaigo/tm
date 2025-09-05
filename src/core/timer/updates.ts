import type { Timer } from "./entity";

// Pure update functions - no side effects, just timer transformations
// These functions don't manage state, they just transform timer data

export const startTimer = (timer: Timer, currentTime: number): Timer => ({
  ...timer,
  status: "running",
  startTime: currentTime,
  pausedAt: null,
});

export const pauseTimer = (timer: Timer, currentTime: number): Timer => {
  if (timer.status !== "running") return timer;

  return {
    ...timer,
    status: "paused",
    pausedAt: currentTime,
  };
};

export const resumeTimer = (timer: Timer, currentTime: number): Timer => {
  if (timer.status !== "paused" || !timer.pausedAt || !timer.startTime) {
    return timer;
  }

  const pausedDuration = currentTime - timer.pausedAt;
  return {
    ...timer,
    status: "running",
    startTime: timer.startTime + pausedDuration,
    pausedAt: null,
  };
};

export const stopTimer = (timer: Timer): Timer => ({
  ...timer,
  status: "idle",
  startTime: null,
  pausedAt: null,
  elapsedSeconds: 0,
});

export const tickTimer = (timer: Timer, currentTime: number): Timer => {
  if (timer.status !== "running" || !timer.startTime) return timer;

  const elapsed = Math.floor((currentTime - timer.startTime) / 1000);
  const isCompleted = elapsed >= timer.targetSeconds;

  return {
    ...timer,
    elapsedSeconds: elapsed,
    status: isCompleted ? "completed" : "running",
  };
};

export const setTargetSeconds = (
  timer: Timer,
  targetSeconds: number,
): Timer => ({
  ...timer,
  targetSeconds,
});

// Factory function to create a new timer with default values
// The actual initial state is managed by the store
export const createEmptyTimer = (targetSeconds: number): Timer => ({
  startTime: null,
  pausedAt: null,
  elapsedSeconds: 0,
  targetSeconds,
  status: "idle",
});
