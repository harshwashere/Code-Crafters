import { Schema, model } from "mongoose";

const menuModel = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    special: {
        type: Boolean,
        required: true
    }
})

const Menu = new model("Menu", menuModel)

export default Menu
