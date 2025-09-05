import Timer from "@/shell/tui/components/timer";
import Header from "./components/header";
import { useEnhance } from "./enhance";

export default function Tui() {
  useEnhance();

  return (
    <box padding={1} gap={1}>
      <Header />
      <Timer />
    </box>
  );
}
