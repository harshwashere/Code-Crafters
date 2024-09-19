import { createContext, useEffect, useState } from "react";
import { URL } from "../pages/helper/helper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Store, setStore] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  });

  const getmenu = async () => {
    try {
      const response = await fetch(`${URL}/api/auth/getmenu`, {
        method: "GET",
      });
      if (response.ok) {
        const menu = await response.json();
        setStore(menu.msg);
        
      }
    } catch (error) {
      console.log("Cannot fetch data of service", error);
    }
  };
  useEffect(() => {
    getmenu();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, Store, authorizationToken, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};