import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Notification } from "./screens/Notification";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Notification />
  </StrictMode>,
);
