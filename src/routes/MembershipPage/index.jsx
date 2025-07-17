import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MembershipPage } from "./screens/MembershipPage";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <MembershipPage />
  </StrictMode>,
);
