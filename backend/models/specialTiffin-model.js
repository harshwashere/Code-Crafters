import { model, Schema } from "mongoose";

const specialTiffin = new Schema({
  image: {
    type: String,
    required: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const TiffinData = new model("SpecialTiffin", specialTiffin);

export default TiffinData;
