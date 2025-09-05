import Timer from "@/shell/tui/components/timer";
import Header from "./components/header";

export default function Tui() {
  return (
    <box padding={1} gap={1}>
      <Header />
      <Timer />
    </box>
  );
}
