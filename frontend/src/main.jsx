import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Store from "./react-redux/store.jsx";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if(!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={Store}>
      <StoreContextProvider>
        <StrictMode>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </StrictMode>
      </StoreContextProvider>
    </Provider>
  </AuthProvider>
);
