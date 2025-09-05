import { describe, expect, test } from "bun:test";
import {
  getProgressRatio,
  getRemainingSeconds,
  isExpired,
} from "./calculations";
import type { Timer } from "./entity";

describe("Timer Calculations", () => {
  describe("getRemainingSeconds", () => {
    test("should return remaining seconds when timer has time left", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 300, // 5 minutes
        targetSeconds: 1800, // 30 minutes
        status: "running",
      };

      const remaining = getRemainingSeconds(timer);
      expect(remaining).toBe(1500); // 25 minutes left
    });

    test("should return 0 when timer has exceeded target", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 2000,
        targetSeconds: 1800,
        status: "completed",
      };

      const remaining = getRemainingSeconds(timer);
      expect(remaining).toBe(0);
    });

    test("should return full target seconds when timer hasn't started", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 0,
        targetSeconds: 1800,
        status: "idle",
      };

      const remaining = getRemainingSeconds(timer);
      expect(remaining).toBe(1800);
    });
  });

  describe("getProgressRatio", () => {
    test("should return 0 when timer hasn't started", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 0,
        targetSeconds: 1800,
        status: "idle",
      };

      const progress = getProgressRatio(timer);
      expect(progress).toBe(0);
    });

    test("should return correct progress ratio", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 900, // 15 minutes
        targetSeconds: 1800, // 30 minutes
        status: "running",
      };

      const progress = getProgressRatio(timer);
      expect(progress).toBe(0.5); // 50% complete
    });

    test("should return 1 when timer is completed", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 1800,
        targetSeconds: 1800,
        status: "completed",
      };

      const progress = getProgressRatio(timer);
      expect(progress).toBe(1);
    });

    test("should cap at 1 even when exceeded", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 2000,
        targetSeconds: 1800,
        status: "completed",
      };

      const progress = getProgressRatio(timer);
      expect(progress).toBe(1);
    });

    test("should return 0 when targetSeconds is 0", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 100,
        targetSeconds: 0,
        status: "idle",
      };

      const progress = getProgressRatio(timer);
      expect(progress).toBe(0);
    });
  });

  describe("isExpired", () => {
    test("should return false when timer has time remaining", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 1000,
        targetSeconds: 1800,
        status: "running",
      };

      expect(isExpired(timer)).toBe(false);
    });

    test("should return true when timer has reached target", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 1800,
        targetSeconds: 1800,
        status: "completed",
      };

      expect(isExpired(timer)).toBe(true);
    });

    test("should return true when timer has exceeded target", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 2000,
        targetSeconds: 1800,
        status: "completed",
      };

      expect(isExpired(timer)).toBe(true);
    });

    test("should return false for idle timer", () => {
      const timer: Timer = {
        startTime: null,
        pausedAt: null,
        elapsedSeconds: 0,
        targetSeconds: 1800,
        status: "idle",
      };

      expect(isExpired(timer)).toBe(false);
    });
  });
});
