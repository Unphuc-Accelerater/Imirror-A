import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Settings } from "./screens/Settings";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Settings />
  </StrictMode>,
);
