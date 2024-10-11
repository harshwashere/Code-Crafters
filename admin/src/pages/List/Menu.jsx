import { useEffect, useState } from "react";
import "./Menu.css";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../Helper/Helper";
import { FaTrashCan } from "react-icons/fa6";

export const Menu = () => {
  const [list, setlist] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${URL}/admin/getAllMenu`);

    if (response.status === 200) {
      setlist(response.data.menu);
    } else {
      toast.error("Error!!");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const ans = confirm('Do you want to delete?')
      if (ans === true) {
        // Make sure the foodId is properly concatenated in the URL
        const response = await axios.delete(`${URL}/admin/foodremove/${foodId}`);
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
      <p>All food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Description</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={item.imageURL} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p>{item.description}</p>
              <p onClick={() => removeFood(item._id)} className="cursor"><FaTrashCan /></p>
            </div>
          )
        })}
      </div>
    </div>
  );
};
