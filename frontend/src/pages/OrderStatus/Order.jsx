/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './Order.css'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { URL } from '../helper/helper';
import useAuth from '../../store/useAuth';

const Order = () => {
    const [orders, setOrders] = useState()
    const { authorizationToken, user } = useAuth()
    console.log(user)
    const getUserOrder = async () => {
        try {
            const response = await axios.get(
                `${URL}/order/getUserOrder/${user._id}`, // Check URL
                {
                    headers: {
                        Authorization: authorizationToken, // Ensure token is sent
                    },
                }
            );
            setOrders(response.data.orders); // Set orders in state
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };


    useEffect(() => {
        getUserOrder()
    }, [authorizationToken, getUserOrder])

    const orderMap = (order, index) => {
        return <>
            <tr key={order.id}>
                <td>{order.item}</td>
                <td>
                    <input
                        type="number"
                        value={order.price}
                        readOnly
                        className="input-field"
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={order.quantity}
                        readOnly
                        className="input-field"
                    />
                </td>
                <td>
                    <button className="modify-button">
                        {order.status}
                    </button>
                </td>
            </tr>
        </>
    }

    return (
        <>
            <Navbar />
            <div className="order-modification-container">
                <h3>My Order</h3>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {orders.map(order => (
                            
                        ))} */}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Order