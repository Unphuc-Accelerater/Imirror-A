import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EditProfile } from "./screens/EditProfile";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <EditProfile />
  </StrictMode>,
);
