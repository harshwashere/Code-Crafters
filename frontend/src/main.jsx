import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if(!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider value>
      <App />
    </StoreContextProvider>
  </StrictMode>
);
