/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './Order.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { URL } from '../helper/helper';
import useAuth from '../../store/useAuth';
import { Footer } from '../../components/footer/Footer';

const Order = () => {
    const [orders, setOrders] = useState([])
    const { authorizationToken, user } = useAuth()

    const getUserOrder = async () => {
        if (!user || !user?._id) {
            console.error("Error: User ID is undefined.");
            return; // Stop execution if user._id is not available
        }
        try {
            const response = await axios.get(
                `${URL}/order/getUserOrder/${user?._id}`,
                {
                    headers: {
                        Authorization: authorizationToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    useEffect(() => {
        getUserOrder()
    }, [authorizationToken, user])

    const orderMap = (order, index) => {
        return (
            <tr key={index}>
                <td>{order.order_id || 'Payment Pending'}</td>
                <td>{order.razorpay_payment_id || 'Payment Pending'}</td>
                <td>
                    {order.dishes.map((dish, index) => (
                        <div key={index}>
                            {dish.dishName} (x{dish.quantity}) ₹{dish.price}
                        </div>
                    ))}
                    <br />
                </td>
                <td>
                    <input
                        type="number"
                        value={order.amount / 100}
                        readOnly
                        className="input-field"
                    />
                </td>
                <td>
                    <button className="modify-button">
                        {order.status || 'Payment Pending'}
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Navbar />
            <div className="order-modification-container">
                <h3>My Order</h3>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Payment ID</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(orderMap)
                        ) : (
                            <tr>
                                <td colSpan="5">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default Order