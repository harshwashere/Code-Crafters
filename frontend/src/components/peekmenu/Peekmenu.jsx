import "./peekmenu.css";
import useAuth from '../../store/useAuth'
import { useDispatch } from 'react-redux'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from "react";

const Peekmenu = () => {
    const { Store } = useAuth()
    const dispatch = useDispatch()
    const { addToCart } = useContext(StoreContext)

    const tiffinMap = (data, index) => {
        return (<>
            <div key={index} className="mainPeekMenuDish">
                <div className="peekMenuDish">
                    <div className="peekMenuImg">
                        <img src={data.image} alt={data.name} />
                    </div>
                    <h3>{data.name}</h3>
                    <div>
                        <span>₹{data.price}</span>
                        <button onClick={() => {
                            dispatch(addToCart(
                                data._id
                            ))
                        }} type="button" className="peekButton">Add to cart</button>
                    </div>
                </div>
            </div>
        </>)
    }

    return (
        <>
            <div id="" className="peekMenu">
                <div className="sneakPeekTitle">
                    <h1>Special <span>Tiffin</span></h1>
                    <p>The state-of-the art facility has automated machinery, is installed<br />with rust-free pipelines and faucets and uses only<br />RO treated water.</p>
                </div>
                <div className="sneakPeekMenu">{Store ? <>{Store.map(tiffinMap)}</> : <><div className="loader"></div></>}</div>
            </div>
        </>
    );
};

export default Peekmenu;
