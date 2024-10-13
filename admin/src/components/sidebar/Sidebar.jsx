import "./Sidebar.css"
import { assets } from "../../assets/assets"
import { NavLink } from "react-router-dom"

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/users' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>All Users</p>
        </NavLink>
        <NavLink to='/menu' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Menu</p>
        </NavLink>
        <NavLink to='/special' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Special Tiffin</p>
        </NavLink>
        <NavLink to='/contact' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Contacts</p>
        </NavLink>
        <NavLink to='/scheduleorder' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Scheduled Orders</p>
        </NavLink>
        <NavLink to='/viewOrders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>View Orders</p>
        </NavLink>
      </div>
    </div>
  )
}
