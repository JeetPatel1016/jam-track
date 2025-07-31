import "@radix-ui/themes/styles.css";
import "@/index.css";

import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { store } from "@/state/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Theme
      appearance="dark"
      accentColor="teal"
      grayColor="sage"
      panelBackground="solid"
      radius="full"
    >
      <App />
    </Theme>
  </Provider>
);
