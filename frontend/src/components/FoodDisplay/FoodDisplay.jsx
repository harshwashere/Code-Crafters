import { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'

export const FoodDisplay = () => {
    const { food_list } = useContext(StoreContext)
    return (<>
        <div className="food-display" id='food-display'>
            <h2></h2>
        </div>
    </>)
}