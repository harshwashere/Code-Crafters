import { NavLink } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import "./navbar.css";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [navigator, setNavigator] = useState();
  const [visible, setVisible] = useState();
  const {getTotalCartAmount} = useContext(StoreContext)

  const visibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nameTitle">
          <p>Code Crafters Project</p>
        </div>
        <div className="navigator">
          <ul>
            <NavLink to="/">
              <li
                onClick={() => setNavigator("home")}
                className={navigator === "home" ? "active" : ""}
              >
                Home
              </li>
            </NavLink>
            <NavLink to="/menu">
              <li
                onClick={() => setNavigator("menu")}
                className={navigator === "menu" ? "active" : ""}
              >
                Menu
              </li>
            </NavLink>
            <NavLink to="/">
              <li
                onClick={() => setNavigator("contact")}
                className={navigator === "contact" ? "active" : ""}
              >
                Contact
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="btnGroup">
          <p>
            <FaSearch />
          </p>
          <p className="cartIcon">
            <NavLink to='/cart'>
              <FaShoppingCart />
            </NavLink>
            <div className={getTotalCartAmount() === 0  ? "": "dot"}></div>
          </p>
          <NavLink to='/signin'><button type="button">Sign In</button></NavLink>
        </div>
        <div className="sideBar" style={{ display: visible ? "none" : "block" }} onClick={visibility}>
          <FiMenu />
        </div>
      </nav>
      <div
        className="otherNavigator"
        style={{ display: visible ? "block" : "none" }}
      >
        <div className="closeNavigator" onClick={visibility}>
          <LuUtensilsCrossed />
        </div>
        <ul>
          <NavLink onClick={visibility} to="/">
            <li
              onClick={() => setNavigator("home")}
              className={navigator === "home" ? "active" : ""}
            >
              Home
            </li>
          </NavLink>
          <NavLink onClick={visibility} to="/menu">
            <li
              onClick={() => setNavigator("menu")}
              className={navigator === "menu" ? "active" : ""}
            >
              Menu
            </li>
          </NavLink>
          <NavLink onClick={visibility} to="/">
            <li
              onClick={() => setNavigator("contact")}
              className={navigator === "contact" ? "active" : ""}
            >
              Contact
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
