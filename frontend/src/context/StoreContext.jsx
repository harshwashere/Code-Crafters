/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useAuth from "../store/useAuth";
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const { Menu } = useAuth();

    // Check if Menu and Menu.message exist
    const food_list = Menu && Menu ? Menu : [];

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            toast.info('Your dish had been added')
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            toast.info('Your dish had been added')
        }
    };

    const removeFromCart = (itemId) => {
        toast.info('Dish is removed')
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                // Make sure food_list is not empty and find the item
                let itemInfo = food_list.find((product) => product._id === item);
                // Handle case where itemInfo is undefined
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
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
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
