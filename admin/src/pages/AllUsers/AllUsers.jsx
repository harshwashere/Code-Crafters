import { useEffect, useState } from "react";
import "./AllUsers.css";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../Helper/Helper";
import { FaTrashCan } from "react-icons/fa6";
import { Sidebar } from "../../components/sidebar/Sidebar";
import useAuth from "../../auth/useAuth";

export const AllUsers = () => {
  const [user, setUser] = useState([]);
  const { authorizationToken } = useAuth();

  const fetchList = async () => {
    if (!authorizationToken) {
      toast.error("Unauthorized! Token not found.");
      return;
    }

    try {
      const response = await axios.get(`${URL}/admin/getAllUser`, {
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUser(response.data.message);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeUser = async (userId) => {
    if (!authorizationToken) {
      toast.error("Unauthorized! Token not found.");
      return;
    }

    const confirmDelete = window.confirm("Do you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${URL}/admin/userremove/${userId}`, {
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        fetchList(); // Refresh the user list
      } else {
        toast.error("Failed to delete the user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the user.");
    }
  };
console.log(user);

  return (
    <>
      <Sidebar />
      <div className="list add flex-col">
        <p>All user lists</p>
        <div className="user-table">
          <div className="user-table-format title">
            <b>Name</b>
            <b>Email</b>
            <b>Phone</b>
            <b>Address</b>
            <b>City</b>
            <b>Country</b>
            <b>Action</b>
          </div>

          {user.length > 0 ? (
            user.map((item, index) => (
              <div key={index} className="user-table-format">
                <p>{item.name}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <p>{item.address}</p>
                <p>{item.city}</p>
                <p>{item.country}</p>
                <p onClick={() => removeUser(item._id)} className="cursor">
                  <FaTrashCan />
                </p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </>
  );
};
