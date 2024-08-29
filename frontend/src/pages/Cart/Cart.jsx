import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import Navbar from "../../components/navbar/Navbar";
import './cart.css'
import { Footer } from "../../components/footer/Footer";

export const Cart = () => {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)

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
                {food_list.length > 0 ? (food_list.map((item, index) => {
                    const quantity = cartItems[item._id] || 0;
                    if (quantity > 0) {
                        return (<>
                            <div className="cart-items-title cart-items-item" key={index}>
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>₹{item.price * cartItems[item._id]}</p>
                                <p onClick={() => removeFromCart} className="cross">X</p>
                            </div>
                            <hr />
                        </>)
                    }
                })) : (
                    <p>No Cart items found</p>
                )}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
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
                            <b>₹{getTotalCartAmount + 2}</b>
                        </div>
                        <button>Proceed to checkout</button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have a promocode, Enter it here</p>
                            <div className="cart-promocode-input">
                                <input type="text" placeholder="Promo Code" />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>)
}