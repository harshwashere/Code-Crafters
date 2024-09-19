import { useContext } from "react";
import { AuthContext } from "./auth";

const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

export default useAuth