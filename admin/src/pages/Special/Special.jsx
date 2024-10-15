import { useEffect, useState } from "react";
import { URL } from "../Helper/Helper";
import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
import './Special.css'
import { Sidebar } from "../../components/sidebar/Sidebar";
import useAuth from '../../auth/useAuth'

const Special = () => {
    const [special, setSpecial] = useState()
    const { authorizationToken } = useAuth()

    const getSpecialFood = async () => {
        const response = await axios.get(`${URL}/admin/getAllSpecialTiffin`, {
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            setSpecial(response.data.specialData);
        } else {
            toast.error("Error!!");
        }
    }

    useEffect(() => {
        getSpecialFood()
    }, [])

    const removeFood = async (itemId) => {
        try {
            const ans = confirm('Do you want to delete?')
            if (ans === true) {
                // Make sure the foodId is properly concatenated in the URL
                const response = await axios.delete(`${URL}/admin/userremove/${itemId}`);

                // Fetch the updated food list
                await getSpecialFood();

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

    return (<>
        <Sidebar />
        <div className="list add flex-col">
            <h2>All Special Tiffin</h2>
            <div className="list-table">
                <div className="list-special-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {special ? special.map((item, index) => {
                    return (
                        <div key={index} className="list-special-format">
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>₹{item.price}</p>
                            <p onClick={() => removeFood(item._id)} className="cursor"><FaTrashCan /></p>
                        </div>
                    )
                }) : <><p>No Special Dishes Found</p></>}
            </div>
        </div>
    </>
    );
}

export default Special