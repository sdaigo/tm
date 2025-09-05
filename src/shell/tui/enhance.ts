import { useKeyboard, useRenderer } from "@opentui/react";
import { useEffect } from "react";

export const useEnhance = () => {
  const renderer = useRenderer();

  useEffect(() => {
    process.env.NODE_ENV === "development" && renderer.console.show();
    // renderer.toggleDebugOverlay();
  }, [renderer]);

  useKeyboard((key) => {
    if (key.name === "return") {
    }

    if (key.name === "space") {
    }

    if (key.name === "escape") {
    }
  });
};
