import { FaArrowRight } from "react-icons/fa";
import "./header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div id="home" className="header">
        <div className="div1header">
          <div className="hungrydiv">
            <h3>Hungry?</h3>
          </div>
          <div className="tagline">
            <h1>
              Special dishes from <span>आई❤️Tiffin</span>
              <br />
              made with <span>Love from Aai</span>
            </h1>
          </div>
          <p>
            Here You Will Find All the Best Quality And Pure Food.<br />Order
            Now To Satisfy Your Hunger Pangs
          </p>
          <div className="orderNowGroup">
            <NavLink to="/menu"><button className="orderNowBtn">Order Now</button></NavLink>
            <NavLink to="/schedule"><button>
              Schedule a tiffin{" "}
              <i>
                <FaArrowRight />
              </i>
            </button></NavLink>
          </div>
        </div>
        <div className="headerImg">
          {/* <img src="./src/assets/Header-Image.jpg" alt="Header-Image.jpg" /> */}
          <img src="https://cdn.pixabay.com/photo/2015/05/02/01/03/lunch-box-749367_1280.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Header;
