import { useEffect, useState } from "react";
import "./Contact.css"
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../Helper/Helper";
import { FaTrashCan } from "react-icons/fa6";

export const Contact = () => {
  const [contact, setcontact] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${URL}/admin/getAllContacts`);
    console.log(response)
    if (response.status === 200) {
      setcontact(response.data.message);
    } else {
      toast.error("Error!!");
    }
  };

  const removeFood = async (contactId) => {
    try {
      const ans = confirm('Do you want to delete?')
      if (ans === true) {
        // Make sure the foodId is properly concatenated in the URL
        const response = await axios.delete(`${URL}/admin/contactremove/${contactId}`);
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
      <p>All contact lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Query</b>
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Message</b>
          <b>Action</b>
        </div>
        {contact ? contact.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.option}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.message}</p>
              <p onClick={() => removeFood(item._id)} className="cursor"><FaTrashCan /></p>
            </div>
          )
        }) : <><p>No contact found</p></>}
      </div>
    </div>
  );
}
