import { FaArrowRight } from "react-icons/fa";
import "./header.css";

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
              Special dishes from <span>Aai Cha Dabba</span>
              <br />
              made with <span>Love from Aai</span>
            </h1>
          </div>
          <p>
            Here You Will Find All the Best Quality And Pure Food.<br />Order
            Now To Satisfy Your Hunger Pangs
          </p>
          <div className="orderNowGroup">
            <button className="orderNowBtn">Order Now</button>
            <button>
              Schedule a tiffin{" "}
              <i>
                <FaArrowRight />
              </i>
            </button>
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
