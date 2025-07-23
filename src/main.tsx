import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import App from "./App.tsx";
import "./index.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <Theme
    appearance="dark"
    accentColor="teal"
    grayColor="sage"
    panelBackground="solid"
    radius="full"
  >
    <App />
  </Theme>
);
