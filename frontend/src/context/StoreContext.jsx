/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useAuth from "../store/useAuth";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const { Menu } = useAuth();
    console.log(Menu);
    
    // Check if Store and Store.message exist
    const food_list = Menu && Menu.menuData ? Menu.menuData : [];

    console.log(food_list);
    

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        console.log(itemId);
        
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            console.log(cartItems);
            
            if (cartItems[item] > 0) {
                // Make sure food_list is not empty and find the item
                let itemInfo = food_list.find((product) => product._id === item);
                console.log(itemInfo)

                // Handle case where itemInfo is undefined
                if (itemInfo) {
                    console.log(itemInfo);
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
