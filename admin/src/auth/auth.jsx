/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from '../pages/Helper/Helper'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
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
            const response = await axios(`${URL}/admin/adminuser`, {
                method: 'GET',
                headers: {
                    "Authorization": authorizationToken,
                },
            });
            if (response.status === 200) {
                setUser(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [authorizationToken]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, LogoutUser, token, authorizationToken, storeTokenInLS, user }}>
            {children}
        </AuthContext.Provider>
    );
}