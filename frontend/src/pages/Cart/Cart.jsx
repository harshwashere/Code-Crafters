import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { Footer } from "../../components/footer/Footer";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";

export const Cart = () => {

    // const [responseId, setResponseId] = useState("");
    // const [responseState, setResponseState] = useState([]);
    const { cartItems, Store, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
    function Car() {
        if (cartItems.length == 0 || undefined) {
            const Card = "No Item Found"
            return Card
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


    return (<>
        <Navbar />
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />

                {Store.message?.length > 0 ? (Store.message?.map((item, index) => {
                    const quantity = cartItems[item._id] || 0;
                    if (quantity > 0) {
                        return (<>
                            <div className="cart-items-title cart-items-item" key={index}>
                                <div><img src={item.image} alt={item.name} /></div>
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
                            <hr />
                        </>)
                    }
                })) : (
                    <p>{Card}</p>
                )}
            </div>
            <div className="cart-summary">
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Summary</h2>
                        <div className="cart-summary-dish">
                            {Store.message?.length > 0 ? (Store.message?.map((item, index) => {
                                const quantity = cartItems[item._id] || 0;
                                if (quantity > 0) {
                                    return (<>
                                        <div key={index}>
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