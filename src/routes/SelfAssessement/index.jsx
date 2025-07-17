import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SelfAssessement } from "./screens/SelfAssessement";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <SelfAssessement />
  </StrictMode>,
);
