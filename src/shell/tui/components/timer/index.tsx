import { useKeyboard } from "@opentui/react";
import { useEnhance } from "./enhance";

export default function Timer() {
  const {
    status,
    timePassed,
    timeRemaining,
    percentage,
    canStart,
    canPause,
    canResume,
    canStop,
    handleStart,
    handlePause,
    handleResume,
    handleStop,
  } = useEnhance();

  // Keyboard controls
  useKeyboard((key) => {
    switch (key.name) {
      case "s":
        if (canStart) handleStart();
        break;
      case "p":
        if (canPause) handlePause();
        break;
      case "r":
        if (canResume) handleResume();
        break;
      case "x":
        if (canStop) handleStop();
        break;
    }
  });

  // Status color
  const progressColor = (() => {
    switch (status) {
      case "running":
        return "green";
      case "paused":
        return "yellow";
      case "completed":
        return "cyan";
      default:
        return "gray";
    }
  })();

  return (
    <box
      height={8}
      gap={1}
      border
      style={{
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <text>Status: {status.toUpperCase()}</text>
      <text>
        Elapsed: {timePassed} | Remaining: {timeRemaining}
      </text>

      {/* Progress bar */}
      <box
        flexDirection="row"
        style={{
          overflow: "hidden",
          height: 1,
        }}
      >
        <box
          style={{
            height: 1,
            width: percentage,
            backgroundColor: progressColor,
          }}
        />
      </box>
      <text>{percentage}% complete</text>

      {/* Controls hint */}
      <text>
        Controls:{" "}
        {[
          canStart && "[S]tart",
          canPause && "[P]ause",
          canResume && "[R]esume",
          canStop && "[X] Stop",
        ]
          .filter(Boolean)
          .join(" ")}
      </text>
    </box>
  );
}
