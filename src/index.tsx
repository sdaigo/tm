import { render } from "@opentui/react";
import { Provider } from "react-redux";
import Tui from "./shell/tui";
import { store } from "./store";

render(
  <Provider store={store}>
    <Tui />
  </Provider>,
);
