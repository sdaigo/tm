import type { Timer } from "./entity";

// Pure domain calculations - business logic computations without side effects

export const getRemainingSeconds = (timer: Timer): number => {
  const remaining = timer.targetSeconds - timer.elapsedSeconds;
  return Math.max(0, remaining);
};

export const getProgressRatio = (timer: Timer): number => {
  if (timer.targetSeconds === 0) return 0;
  return Math.min(1, timer.elapsedSeconds / timer.targetSeconds);
};

export const isExpired = (timer: Timer): boolean => {
  return timer.elapsedSeconds >= timer.targetSeconds;
};
