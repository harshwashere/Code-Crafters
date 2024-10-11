import { useEffect, useState } from "react";
import "./AllUsers.css"
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../Helper/Helper";
import { FaTrashCan } from "react-icons/fa6";

export const AllUsers = () => {
  const [user, setuser] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${URL}/admin/getAllUser`);
    console.log(response)
    if (response.status === 200) {
      setuser(response.data.message);
    } else {
      toast.error("Error!!");
    }
  };

  const removeFood = async (userId) => {
    try {
      const ans = confirm('Do you want to delete?')
      if (ans === true) {
        // Make sure the foodId is properly concatenated in the URL
        const response = await axios.delete(`${URL}/admin/userremove/${userId}`);
        console.log(response.data);

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

  return (
    <div className="list add flex-col">
      <p>All user lists</p>
      <div className="user-table">
        <div className="user-table-format title">
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>City</b>
          <b>Country</b>
          <b>Action</b>
        </div>
        {user ? user.map((item, index) => {
          return (
            <div key={index} className="user-table-format">
              <p>{item ? item.firstname : 'No name'}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.city}</p>
              <p>{item.country}</p>
              <p onClick={() => removeFood(item._id)} className="cursor"><FaTrashCan /></p>
            </div>
          )
        }) : <><p>No user found</p></>}
      </div>
    </div>
  );
}
