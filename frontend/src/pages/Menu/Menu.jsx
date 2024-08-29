import { Footer } from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import './menu.css'

export const Menu = () => {
    return (<>
        <Navbar />
        <div className='menu'>
            <div className=''>
                <h2>Popular Category</h2>
                <p>Order food from our curated list of our categories.</p>
            </div>
            <div className='menu-category'>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
                <div className="category-box"><p>Veg Food</p></div>
            </div>
        </div>
        <Footer />
    </>)
}