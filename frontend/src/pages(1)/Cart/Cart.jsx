import { useContext, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { Footer } from "../../components/footer/Footer";
import { FaTrashCan } from "react-icons/fa6";
// import axios from "axios";

export const Cart = () => {
    const [visible1, setVisible1] = useState("grid")
    const [visible2, setVisible2] = useState("none")
    // const [responseId, setResponseId] = useState("");
    // const [responseState, setResponseState] = useState([]);
    const { cartItems, Menu, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
    function Car() {
        if (cartItems.length == 0 || undefined) {
            return <><p>No items in Cart</p></>
        }
    }
    const Card = Car
    // const createRazorpayOrder = (amount) => {
    //     let data = JSON.stringify({
    //         amount: amount * 100,
    //         currency: "INR"
    //     })

    //     let config = {
    //         method: "post",
    //         maxBodyLength: Infinity,
    //         url: "http://localhost:5000/orders",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     }

    //     axios.request(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data))
    //             handleRazorpayScreen(response.data.amount)
    //         })
    //         .catch((error) => {
    //             console.log("error at", error)
    //         })
    // }

    // const handleRazorpayScreen = async (res, amount) => {
    //     // const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

    //     if (!res) {
    //         alert("Some error at razorpay screen loading")
    //         return;
    //     }

    //     const options = {
    //         key: 'rzp_test_GcZZFDPP0jHtC4',
    //         amount: amount,
    //         currency: 'INR',
    //         name: "papaya coders",
    //         description: "payment to papaya coders",
    //         image: "https://papayacoders.com/demo.png",
    //         handler: function (response) {
    //             setResponseId(response.razorpay_payment_id)
    //         },
    //         prefill: {
    //             name: "papaya coders",
    //             email: "papayacoders@gmail.com"
    //         },
    //         theme: {
    //             color: "#F4C430"
    //         }
    //     }
    //     const payment = (e) => {
    //         e.preventDefault();

    //         const paymentId = e.target.paymentId.value;

    //         axios.get(`http://localhost:5000/payment/${paymentId}`)
    //         .then((response) => {
    //           console.log(response.data);
    //           setResponseState(response.data)
    //         })
    //         .catch((error) => {
    //           console.log("error occures", error)
    //         })
    //       }

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
            <div className="cart-items" style={{display: visible1}}>
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
            <div className="address-section" style={{display: visible2}}>

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
                            <button>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <Footer />
    </>)
}