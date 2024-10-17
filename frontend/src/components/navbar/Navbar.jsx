import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import "./navbar.css";
import "../SearchBar/search.css";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { RxCross1 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import useAuth from "../../store/useAuth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  const [visible, setVisible] = useState(true);

  const [visible2, setVisible2] = useState(true);

  const [visible3, setVisible3] = useState(true);

  const { getTotalCartAmount, cartitems } = useContext(StoreContext);


  function cartLength() {
    if (Object.keys(cartitems).length === 0) {
      return <></>
    } else {
      return Object.keys(cartitems).length
    }
  }

  const visibility = () => {
    setVisible(!visible);
  };

  const visibility2 = () => {
    setVisible2(!visible2);
  };

  const visibility3 = () => {
    setVisible3(!visible3);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nameTitle">
          <h1><NavLink to='/'>आई❤️Tiffin</NavLink></h1>
        </div>
        <div className="mainBtn">
          <NavLink to="/menu">
            <button>Order Now</button>
          </NavLink>
          <NavLink to="/schedule">
            <button>Schedule a tiffin</button>
          </NavLink>
        </div>
        <div className="navBtnGroup">
          <div className="navigator">
            <ul>
              <NavLink to="/">
                <li>
                  Home
                </li>
              </NavLink>
              <NavLink to="/menu">
                <li>
                  Menu
                </li>
              </NavLink>
              <NavLink to="/contact">
                <li>
                  Contact
                </li>
              </NavLink>
            </ul>
          </div>

          <div className="btnGroup btnG">
            {/* <NavLink onClick={visibility2}>
              <FaSearch />
            </NavLink> */}
            {isLoggedIn ? (
              <>
                <p className="cartIcon">
                  <NavLink to="/cart">
                    <FaShoppingCart />
                  </NavLink>
                  <div
                    className={getTotalCartAmount() === 0 ? "" : "dot"}
                  >{cartLength()}</div>
                </p>
                <div className="profile-section">
                  <CgProfile onClick={visibility3} className="profile-icon" />
                  <div
                    className="profile-list"
                    style={{ display: visible3 ? "none" : "flex" }}
                  >
                    <div className="list">
                      <NavLink to="/profile">My Profile</NavLink>
                    </div>
                    <hr className="list-line" />
                    <div className="list"><NavLink to="/order">Your Orders</NavLink></div>
                    <hr className="list-line" />
                    <div className="list">
                      <NavLink to="/logout">
                        Log Out <TbLogout />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/signin">
                  <button type="button">Sign In</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="sideBar" onClick={visibility}>
          <FiMenu />
        </div>
        <div
          className="searchPage"
          style={{ display: visible2 ? "none" : "block" }}
        >
          <div className="searchBox">
            <div className="searchBoxCard">
              <div className="searchBoxClose">
                <i onClick={visibility2}>
                  <RxCross1 />
                </i>
              </div>
              <div className="searchBoxInner">
                <div className="searchBoxLogo">
                  {/* <img src="images/logo/logo-white.png" alt="search" className="img-fluid" /> */}
                  <h1 className="img-fluid">Aai Cha Dabba</h1>
                </div>
                <div className="searchBoxForm">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <button type="button" className="btn btnSecondary">
                      <IoMdSearch /> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="navbarline" />
      <div
        className="otherNavigator"
        style={{ display: visible ? "none" : "block" }}
      >
        <div className="closeNavigator" onClick={visibility}>
          <LuUtensilsCrossed />
        </div>
        <ul type="none">
          <NavLink style={{ textDecoration: "none", color: "black" }} onClick={visibility} to="/">
            <li>Home</li>
          </NavLink>
          <NavLink style={{ textDecoration: "none", color: "black" }} onClick={visibility} to="/menu">
            <li>Menu</li>
          </NavLink>
          <NavLink style={{ textDecoration: "none", color: "black" }} onClick={visibility} to="/contact">
            <li>Contact</li>
          </NavLink>
          <div className="mainBtn1">
            <NavLink to='/menu'><button>Order Now</button></NavLink>
            <NavLink to='/schedule'><button>Schedule a tiffin</button></NavLink>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
