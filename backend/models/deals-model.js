import { Schema, model } from "mongoose";

const dealsModel = new Schema({
    image:{
        type: String,
        required: true
    }
})

const Deals = new model('deals', dealsModel)

export default Deals