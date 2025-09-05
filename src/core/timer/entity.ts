// Timer domain entity - pure types only, no state management
export type TimerStatus = "idle" | "running" | "paused" | "completed";

// Domain entity representing timer data
export interface Timer {
  startTime: number | null;
  pausedAt: number | null;
  elapsedSeconds: number;
  targetSeconds: number;
  status: TimerStatus;
}

// Domain constants
export const DEFAULT_TARGET_SECONDS = 30 * 60; // 30 minutes
