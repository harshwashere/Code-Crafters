import { useEffect, useState } from 'react';
import './Deals.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../Helper/Helper';
import { FaTrashCan } from 'react-icons/fa6';
import { Sidebar } from '../../components/sidebar/Sidebar';

const Deals = () => {
    const [deals, setdeals] = useState()

    const fetchDeals = async () => {
        const response = await axios.get(`${URL}/admin/getAllDeals`);

        if (response.status === 200) {
            setdeals(response.data.deals);
        } else {
            toast.error("Error!!");
        }
    }
    useEffect(() => {
        fetchDeals()
    }, [])
    const removeDeals = async (itemId) => {
        try {
            const ans = confirm('Do you want to delete?')
            if (ans === true) {
                // Make sure the foodId is properly concatenated in the URL
                const response = await axios.delete(`${URL}/admin/dealremove/${itemId}`);

                // Fetch the updated food list
                await fetchDeals();

                // Check the status and show the toast message
                if (response.status === 200) {
                    toast.success(response.data.message);
                } else {
                    toast.error("Error!!");
                }
            } else {
                alert('Denied');
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred!');
        }
    }
    return (
        <>
            <Sidebar />
            <div className="list add flex-col">
                <p>All food Lists</p>
                <div className="deal-table">
                    <div className="deal-table-format title">
                        <b>Image</b>
                        <b>Action</b>
                    </div>
                    {deals ? deals.map((item, index) => {
                        return (
                            <div key={index} className="deal-table-format">
                                <img src={item.image} alt="" />
                                <p onClick={() => removeDeals(item._id)} className="cursor"><FaTrashCan /></p>
                            </div>
                        )
                    }) : <><p>No deals found</p></>}
                </div>
            </div>
        </>
    );
}

export default Deals