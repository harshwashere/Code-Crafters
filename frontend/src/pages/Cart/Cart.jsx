import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import Navbar from "../../components/navbar/Navbar";
import "./cart.css";
import { Footer } from "../../components/footer/Footer";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { URL } from "../helper/helper";
import useAuth from "../../store/useAuth";
import { toast } from "react-toastify";

export const Cart = () => {
    const [visible1, setVisible1] = useState("grid");
    const [visible2, setVisible2] = useState("none");
    const [submitted, setSubmitted] = useState(false);

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const { cartitems, Menu, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const { user, authorizationToken } = useAuth();

    useEffect(() => {
        if (user) {
            setUserDetails({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [user]);

    const checkoutHandler = async (amount) => {
        const { data: { key } } = await axios.get(`${URL}/payment/getkey`);

        const response = await axios.post(
            `${URL}/payment/createOrder`,
            { amount },
            {
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
            }
        );

        const options = {
            key,
            amount: response.data.order.amount,
            currency: "INR",
            name: "Aai Loves Tiffin",
            description: "Test Transaction",
            order_id: response.data.order.id,
            callback_url: `${URL}/payment/verifyOrder`,
            prefill: userDetails,
            theme: { color: "#78C091" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            const orderData = {
                userDetails,
                dishes: Menu.filter((item) => cartitems[item._id] > 0).map((item) => ({
                    dishName: item.name,
                    quantity: cartitems[item._id],
                    price: item.price,
                    dishTotalPrice: item.price * cartitems[item._id],
                })),
                totalPrice: getTotalCartAmount() + 2, // Adding delivery fee
            };

            const response = await axios.post(`${URL}/order/createorder`, orderData, {
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                toast.success("Your details have been submitted. Proceed to payment.");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showCartSection = () => {
        setVisible1("grid");
        setVisible2("none");
    };

    const showAddressSection = () => {
        setVisible2("flex");
        setVisible1("none");
    };

    return (
        <>
            <Navbar />
            <div className="cart">
                <div className="tab">
                    <div onClick={showCartSection}><p>Your cart</p></div>
                    <div onClick={showAddressSection}><p>Enter your address</p></div>
                </div>

                <div className="cart-items" style={{ display: visible1 }}>
                    <div className="cart-items-title">
                        <p>Name</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <hr />
                    {cartitems ?
                        Menu.map((item, index) => {
                            const quantity = cartitems[item._id] || 0;
                            if (quantity > 0) {
                                return (
                                    <div className="cart-items-item" key={index}>
                                        <p>{item.name}</p>
                                        <p>₹{item.price}</p>
                                        <p>{quantity}</p>
                                        <p>₹{item.price * quantity}</p>
                                        <p
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFromCart(item._id);
                                            }}
                                            className="cross"
                                        >
                                            <FaTrashCan />
                                        </p>
                                    </div>
                                );
                            }
                        }) : (
                    <p>No items in Cart</p>
                    )}
                    <button className="updateBtn" onClick={showAddressSection}>Update Address</button>
                </div>

                <div className="address-section" style={{ display: visible2 }}>
                    <form onSubmit={handleFormSubmit} className="address-form">
                        <div>
                            <label>Enter your name</label>
                            <input
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label>Enter Your email</label>
                            <input
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="example@example.com"
                            />
                        </div>
                        <div>
                            <label>Enter mobile number</label>
                            <input
                                name="phone"
                                value={userDetails.phone}
                                onChange={handleChange}
                                type="tel"
                                placeholder="Enter your number"
                            />
                        </div>
                        <div>
                            <label>Enter your address</label>
                            <input
                                name="address"
                                value={userDetails.address}
                                onChange={handleChange}
                                type="text"
                                placeholder="123, New Street, London"
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="cart-summary">
                    <div className="cart-bottom">
                        <div className="cart-total">
                            <h2>Cart Summary</h2>
                            <div className="cart-summary-dish">
                                {Menu.length > 0 ? (
                                    Menu.map((item, index) => {
                                        const quantity = cartitems[item._id] || 0;
                                        if (quantity > 0) {
                                            return (
                                                <div className="dish-count" key={index}>
                                                    <p>{quantity}x</p>
                                                    <p>{item.name}</p>
                                                    <p>₹{item.price}</p>
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <p>No Cart items found</p>
                                )}
                            </div>
                            <div className="cart-total-summary">
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>₹{getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <h2>Total: ₹{getTotalCartAmount()}</h2>
                                <button
                                    onClick={() => checkoutHandler(getTotalCartAmount() + 2)}
                                    disabled={!submitted}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
