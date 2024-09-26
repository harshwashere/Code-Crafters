import { Schema, model } from "mongoose";

const scheduleSchema = Schema({
    mealFor: String,
    mealType: String,
    mealPlans: Object,
    duration: Object,
    mealsPerWeek: String,
    quantity: Number,
    chapatiCount: Number,
    riceType: String,
    startDate: String,
    totalPrice: Number,
  });

  const scheduleModel = new model('schedule',scheduleSchema)
  
  export default scheduleModel;