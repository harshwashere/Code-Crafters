import { useEffect, useState } from 'react';
import './ScheduleOrder.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../Helper/Helper';
import { FaTrashCan } from 'react-icons/fa6';
import { Sidebar } from '../../components/sidebar/Sidebar';
import useAuth from '../../auth/useAuth'

const ScheduleOrder = () => {
    const [schedule, setschedule] = useState([]);
    const {authorizationToken} = useAuth()

    const fetchList = async () => {
        const response = await axios.get(`${URL}/admin/getAllScheduleOrders`, {
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            setschedule(response.data.scheduleData);
        } else {
            toast.error("Error!!");
        }
    };

    const removeSchedule = async (itemId) => {
        try {
            const ans = confirm('Do you want to delete?')
            if (ans === true) {
                // Make sure the foodId is properly concatenated in the URL
                const response = await axios.delete(`${URL}/admin/scheduleremove/${itemId}`);

                // Fetch the updated food list
                await fetchList();

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
    };


    useEffect(() => {
        fetchList();
    }, []);

    return (<>
        <Sidebar />
        <div className="list add flex-col">
            <p>All food Lists</p>
            <div className="schedule-table">
                <div className="schedule-table-format title">
                    <b>User Id</b>
                    <b>Meal For</b>
                    <b>Lunch duration</b>
                    <b>Dinner duration</b>
                    <b>Lunch meal plan</b>
                    <b>Dinner meal plan</b>
                    <b>Quantity</b>
                    <b>Start Date</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {schedule ? schedule.map((item, index) => {
                    return (
                        <div key={index} className="schedule-table-format">
                            <p>{item.userId}</p>
                            <p>{item.mealFor}</p>
                            <p>{item.duration.lunch}</p>
                            <p>{item.duration.dinner}</p>
                            <p>{item.mealPlans.lunch}</p>
                            <p>{item.mealPlans.dinner}</p>
                            <p>{item.quantity}</p>
                            <p>{item.startDate}</p>
                            <p>₹{item.totalPrice}</p>
                            <p onClick={() => removeSchedule(item._id)} className="cursor"><FaTrashCan /></p>
                        </div>
                    )
                }) : <><p>No Schedule is found</p></>}
            </div>
        </div>
    </>
    );
}

export default ScheduleOrder