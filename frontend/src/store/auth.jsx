/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { URL } from "../pages/helper/helper";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Store, setStore] = useState("");
  const [Menu, setMenu] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;
  console.log(isLoggedIn);
  

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await axios.get(`${URL}/api/user`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log(response);
      
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
  }, []);

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

  const getMenu = async () => {
    try {
      const menu = await axios.get(`${URL}/menu/getmenucategory`)
      
      if (menu.status === 200) {
        setMenu(menu.data.menuData)
        console.log(Menu); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMenu()
  }, [])
  

  const payment = async(req, res) => {
    try {
      const {amount} = req.body

      const paymentResponse = await axios.post(`${URL}/payment/create-order`, {
        body: JSON.stringify({
          amount,
          currency: "INR",
          reciept: "reciept#1",
          notes: []
        })
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, Store, Menu, authorizationToken, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};