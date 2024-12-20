/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { URL } from "../pages/helper/helper";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Store, setStore] = useState("");
  const [Category, setCategory] = useState("")
  const [Menu, setMenu] = useState([])
  const [Deals, setDeals] = useState()
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  // const [isLoggedIn, setIsloggedin] = useState(false)
  const authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      // 
      const response = await axios(`${URL}/api/user`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.status === 200) {
        // setIsloggedin(true)
        setUser(response.data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [authorizationToken]);

  const getSpecialTiffinData = async () => {
    try {
      const response = await axios.get(`${URL}/homeapi/specialtiffin`);

      if (response.status === 201) {

        setStore(response.data.message);
      }
    } catch (error) {
      console.log("Cannot fetch data of service", error);
    }
  };
  useEffect(() => {
    getSpecialTiffinData();
  }, []);

  const getMenuCategory = async () => {
    try {
      const menu = await axios.get(`${URL}/menu/getmenucategory`)

      if (menu.status === 200) {
        setCategory(menu.data.menuData)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMenuCategory()
  }, [])

  const getMenu = async () => {
    try {
      const menuData = await axios.get(`${URL}/menu/getmenu`)

      if (menuData.status === 200) {
        setMenu(menuData.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  const deals = async () => {
    try {
      const deal = await axios.get(`${URL}/api/deals`)

      if (deal.status === 200) {
        setDeals(deal.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    deals()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, Store, Deals, Menu, Category, authorizationToken, LogoutUser, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
