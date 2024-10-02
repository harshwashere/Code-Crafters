/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Footer } from '../../components/footer/Footer'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import useAuth from '../../store/useAuth'
import './menu.css'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { StoreContext } from '../../context/StoreContext'

export const Menu = () => {

    const { Category, Menu, Deals } = useAuth()

    const [Categories, setCategories] = useState('Bread')

    const dispatch = useDispatch()

    const { addToCart } = useContext(StoreContext)

    const sliderRef = useRef(null)
    const isAutoScrolling = useRef(true)

    const [selectedCategory, setSelectedCategory] = useState(null)

    const scrollLeft = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 200
        }
    })

    const scrollRight = useCallback(() => {
        if (sliderRef.current) {
            const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            if (sliderRef.current.scrollLeft >= maxScrollLeft) {
                sliderRef.current.scrollLeft = 0; // Reset to start when it reaches the end
            } else {
                sliderRef.current.scrollLeft += 200; // Scroll right by 200px
                handleInfiniteScroll()
            }
        }
    }, []);
    
    const handleInfiniteScroll = () => {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft >= maxScrollLeft) {
            sliderRef.current.scroll({
                left: 0,
                behavior: "smooth", // Correct spelling of behavior
            });
        }
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (isAutoScrolling.current) {
                scrollRight();
            }
        }, 1500);
    
        return () => clearInterval(interval);
    }, [scrollRight]);
    

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };


    const menuMap = (data, index) => {
        return (<>
            <div key={index} className="category-box"
                onClick={() => setCategories(data)}>
                <h3>{data}</h3>
            </div>
        </>)
    }

    const filterdata = Array.isArray(Menu)
        ? Menu.filter((items) =>
            String(items.category)
                .toLowerCase()
                .includes(String(Categories).toLowerCase())
        )
        : [];

    const DataMap = (data, index) => {
        return (<>
            <div key={index} className="food-list">
                <div className="food-item-img">
                    <img
                        src={data.imageURL}
                        alt={data.name}
                    />
                </div>
                <div className="food-item-info">
                    <div className="food-item-detail">
                        <h3>{data.name}</h3>
                    </div>
                    <div className="item-description">
                        <p>{data.description}</p>
                    </div>

                    <div className="food-card-tags">
                        <p className="food-item-price">₹{data.price}</p>
                        <button onClick={() => {
                            dispatch(addToCart(data._id))
                        }} type='button' className="add-btn">ADD +</button>
                    </div>
                </div>
            </div>
        </>)
    }

    const DealMap = (data, index) => {
        return <>
            <article key={index} className='deals'>
                <img src={data.image} alt="" />
            </article>
        </>
    }
    return (<>
        <Navbar />
        <div className='menu'>
            <div className="deal-slider">
                <div className="slider-container">
                    <button className="scroll-btn left" onClick={scrollLeft}><MdKeyboardDoubleArrowLeft /></button>
                    <div className='main-slider' ref={sliderRef}>
                        {Deals ?
                            <>
                                {Deals.deal.map(DealMap)}
                            </> :
                            <>
                                <div className="mainLoader">
                                    <div className="loader"></div>
                                </div>
                            </>}
                    </div>
                    <button className="scroll-btn right" onClick={scrollRight}><MdKeyboardDoubleArrowRight /></button>
                </div>
            </div>
            <div className="main-menu">
                <div className='menu-title'>
                    <h2>Our Dish Options</h2>
                    <p>Order food from our curated list of our categories.</p>
                </div>
                <div className='menu-category'>
                    <div className='main-category'>
                        {Category ?
                            <>
                                {Category.map((item, index) => (
                                    <div key={index} onClick={() => handleCategorySelect(item.category)}>
                                        {menuMap(item)}
                                    </div>
                                ))}
                            </> :
                            <>
                                <div className="mainLoader">
                                    <div className="loader"></div>
                                </div>
                            </>}
                    </div>
                    <div className="cat-dish">
                        <div className="food-display">
                            <div className="food-display-list">
                                {Menu ? <>
                                    {filterdata.map(DataMap)}
                                </> :
                                    <>
                                        <div className="mainLoader">
                                            <div className="loader"></div>
                                        </div>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>)
}