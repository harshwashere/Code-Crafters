import { useContext, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { Footer } from "../../components/footer/Footer";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import { URL } from "../helper/helper";
import useAuth from "../../store/useAuth";

export const Cart = () => {
    const [visible1, setVisible1] = useState("grid")
    const [visible2, setVisible2] = useState("none")
    // const [responseId, setResponseId] = useState("");
    // const [responseState, setResponseState] = useState([]);
    const { cartItems, Menu, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
    const { user } = useAuth()
    
    function Car() {
        if (cartItems.length == 0 || undefined) {
            return <><p>No items in Cart</p></>
        }
    }
    const Card = Car

    const checkoutHandler = async (amount) => {
        const { data: { key } } = await axios.get(`${URL}/payment/getkey`)

        const response = await axios.post(`${URL}/payment/createOrder`, {
            amount
        })

        const options = {
            key,
            amount: response.data.order.amount,
            currency: "INR",
            name: "Happy Inc.",
            description: "Test Transaction",
            order_id: response.data.order.id,
            callback_url: `${URL}/payment/verifyOrder`,
            prefill: {
                name: user.firstname + ' ' + user.lastname,
                email: user.email,
                contact: user.phone,
            },
            theme: {
                color: "#78C091",
            },
        };

        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }

    const visibility1 = () => {
        setVisible1("flex")
        setVisible2("none")
    }

    const visibility2 = () => {
        setVisible2("flex")
        setVisible1("none")
    }

    return (<>
        <Navbar />
        <div className="cart">
            <div className="tab">
                <div onClick={visibility1}><p>Your cart</p></div>
                <div onClick={visibility2}><p>Enter your address</p></div>
            </div>
            <div className="cart-items" style={{ display: visible1 }}>
                <div className="cart-items-title">
                    {/* <p>Image</p> */}
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />

                {Menu.length > 0 ? (Menu.map((item, index) => {
                    const quantity = cartItems[item._id] || 0;
                    if (quantity > 0) {
                        return (<>
                            <div className="cart-items-title cart-items-item" key={index}>
                                {/* <div><img src={item.image} alt={item.name} /></div> */}
                                <p>{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>₹{item.price * cartItems[item._id]}</p>
                                <p onClick={(e) => {
                                    // console.log("state", item)
                                    e.stopPropagation()
                                    removeFromCart(item._id)

                                }} className="cross"><FaTrashCan /></p>
                            </div>
                        </>)
                    }
                })) : (
                    <p>{Card}</p>
                )}
            </div>
            <div className="address-section" style={{ display: visible2 }}>

                <form action="" className="address-form">
                    <div>
                        <label htmlFor="">Enter your name</label>
                        <input type="text" placeholder="Enter your name" id="" />
                    </div>
                    <div><label htmlFor="">Enter Your email</label>
                        <input type="email" placeholder="example@example.com" id="" />
                    </div>
                    <div><label htmlFor="">Enter mobile number</label>
                        <input type="tel" placeholder="Enter your number" id="" />
                    </div>
                    <div><label htmlFor="">Enter your address</label>
                        <input type="text" placeholder="123, New Street, London" id="" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="cart-summary">
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Summary</h2>
                        <div className="cart-summary-dish">
                            {Menu.length > 0 ? (Menu.map((item, index) => {
                                const quantity = cartItems[item._id] || 0;
                                if (quantity > 0) {
                                    return (<>
                                        <div className="dish-count" key={index}>
                                            <p>{cartItems[item._id]}x</p>
                                            <p>{item.name}</p>
                                            <p>₹{item.price}</p>
                                        </div>
                                    </>)
                                }
                            }
                            )) : (
                                <p>No Cart items found</p>
                            )}
                        </div>
                        <div className="cart-total-summary">
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>₹{2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹{getTotalCartAmount() + 2}</b>
                            </div>
                            <button onClick={() => checkoutHandler(getTotalCartAmount() + 2)}> Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <Footer />
    </>)
}