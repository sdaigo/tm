import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCanPause,
  selectCanResume,
  selectCanStart,
  selectCanStop,
  selectElapsedFormatted,
  selectProgressBarWidth,
  selectRemainingFormatted,
  selectTimerStatus,
} from "@/store/selectors/timer.selectors";
import { pause, resume, start, stop } from "@/store/slices/timer.slice";

export const useEnhance = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const status = useAppSelector(selectTimerStatus);
  const timePassed = useAppSelector(selectElapsedFormatted);
  const timeRemaining = useAppSelector(selectRemainingFormatted);
  const percentage = useAppSelector(selectProgressBarWidth);

  // Control flags
  const canStart = useAppSelector(selectCanStart);
  const canPause = useAppSelector(selectCanPause);
  const canResume = useAppSelector(selectCanResume);
  const canStop = useAppSelector(selectCanStop);

  // Actions
  const handleStart = () => dispatch(start());
  const handlePause = () => dispatch(pause());
  const handleResume = () => dispatch(resume());
  const handleStop = () => dispatch(stop());

  return {
    // State
    status,
    timePassed,
    timeRemaining,
    percentage,

    // Controls
    canStart,
    canPause,
    canResume,
    canStop,

    // Actions
    handleStart,
    handlePause,
    handleResume,
    handleStop,
  };
};
