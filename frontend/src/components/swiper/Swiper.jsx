import "./swiper.css";
import "swiper/css";
import { FaCartPlus } from "react-icons/fa";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { data } from "../../assets/data";

export const Swipers = () => {
  return (
    <>
      <div className="menuSlide">
        <div className="slideMenuTitle">
          <h1>Our Menu</h1>
          <p>
            Some of our food menu is given here. These are what people order.
            <br />
            If you want you can order from here.
          </p>
        </div>
        <Swiper
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={80}
          slidesPerView={3}
          navigation
          autoplay={true}
          loop={true}
          pagination={{
            dynamicBullets: true,
            hideOnClick: true
          }}
          className="mySwiper"
          scrollbar={{ draggable: true, hide: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={() => console.log('Changed')}
        >
          <div className="menuCard">
            {data.map((data, key) => {
              return (
                <div key={key}>
                  <SwiperSlide>
                    <img
                      src={data.image}
                      alt={data.title}
                      height="100px"
                      width="100%"
                    />
                    <div className="menuInfo">
                      <h2>{data.title}</h2>
                      <div className="menuPriceBtn">
                        <p>{data.interval}</p>
                        <button type="button">
                          <FaCartPlus />
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
          </div>
        </Swiper>
      </div>
    </>
  );
};
