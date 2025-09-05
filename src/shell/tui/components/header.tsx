import { measureText } from "@opentui/core";

const TITLE = "tm";

export default function Header() {
  const { width, height } = measureText({
    text: TITLE,
    font: "tiny",
  });

  return (
    <box flexDirection="row" alignItems="flex-end" padding={1}>
      <box>
        <ascii-font style={{ width, height }} font="tiny" text={TITLE} />
      </box>
    </box>
  );
}
