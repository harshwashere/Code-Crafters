/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAuth from "../store/useAuth";
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const { Menu } = useAuth();
    const [cartitems, setCartitems] = useState({});

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (savedCart) {
            setCartitems(savedCart);
        }
    }, []);

    // Save cart items to localStorage whenever cartItems state changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartitems));
    }, [cartitems]);


    // Check if Menu and Menu.message exist
    const food_list = Menu && Menu ? Menu : [];

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            toast.info('Your dish had been added')
            setCartitems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            toast.info('Your dish had been added')
            setCartitems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1,
            }));
        }
    };

    const removeFromCart = (itemId) => {
        toast.info('Dish is removed')
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        setCartitems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartitems) {

            if (cartitems[item] > 0) {
                // Make sure food_list is not empty and find the item
                let itemInfo = food_list.find((product) => product._id === item);
                // Handle case where itemInfo is undefined
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartitems[item];
                } else {
                    console.error(`Item with _id ${item} not found in food_list`);
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        Menu,
        addToCart,
        removeFromCart,
        setCartItems,
        cartItems,
        cartitems,
        setCartitems,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
