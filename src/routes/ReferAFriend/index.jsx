import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReferAFriend } from "./screens/ReferAFriend";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <ReferAFriend />
  </StrictMode>,
);
