import { Footer } from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import useAuth from '../../store/useAuth'
import './menu.css'

export const Menu = () => {
    const { Menu } = useAuth()
    
    const menuMap = (data, index) => {
        return (<>
            <div key={index} className="category-box"><h2>{data}</h2></div>
        </>)
    }
    return (<>
        <Navbar />
        <div className='menu'>
            <div className=''>
                <h2>Popular Category</h2>
                <p>Order food from our curated list of our categories.</p>
            </div>
            <div className='menu-category'>{Menu ? <>{Menu.map(menuMap)}</> : <><div className="loader"></div></>}</div>
        </div>
        <Footer />
    </>)
}