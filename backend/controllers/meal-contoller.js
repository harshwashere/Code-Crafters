// controllers/mealController.js
import mealModel from "../models/meal-model.js";

// Helper function to generate meal schedule
// const generateMealSchedule = async (userData) => {
//   console.log("1", userData);
//   const {
//     durationPlan,
//     mealPlan,
//     mealTime,
//     mealType,
//     mealsPerWeek,
//     quantity,
//     startDate,
//   } = userData;

//   // Fetch meals that match the user's meal type, plan, and meal time
//   const meals = await mealModel.find({
//     type: mealType,
//     plan: mealPlan,
//     mealFor: mealTime,
//   });
//   console.log(meals);

//   // Check if meals were found
//   if (!meals.length) throw new Error("No matching meals found");

//   // Generate meal dates based on start date and durationPlan plan
//   const generatedSchedule = [];
//   const startDateObj = new Date(startDate);
//   console.log(startDateObj);

//   // Calculate the number of days based on the durationPlan plan
//   let totalDays;
//   if (durationPlan === "1-week") totalDays = 7;
//   else if (durationPlan === "1-month") totalDays = 30;
//   else totalDays = 3; // for 3-day plan

//   // Loop over the number of days, assigning meals
//   for (let i = 0; i < totalDays; i++) {
//     const currentDay = new Date(startDateObj);
//     currentDay.setDate(startDateObj.getDate() + i);

//     const formattedDate = currentDay.toISOString().split("T")[0];

//     // Assign meals to this date
//     const mealIndex = i % meals.length; // Rotate through meals
//     generatedSchedule.push({
//       date: formattedDate,
//       meal: meals[mealIndex],
//     });
//   }

//   return generatedSchedule;
// };

// // Controller function to handle meal schedule requests
// const createMealSchedule = async (req, res) => {
//   try {
//     const userData = req.body;
//     // console.log("userData", req.body);
//     const mealSchedule = await generateMealSchedule(userData);
//     // console.log(mealSchedule);
//     res.json(mealSchedule);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Helper function to generate meal schedule (UNCHANGED)
const generateMealSchedule = async (userData) => {
  const { mealType, startDate, mealsPerWeek, quantity, duration, mealPlans } =
    userData;

  const generatedSchedules = [];

  // Helper function to generate meals for a specific time (lunch or dinner)
  const getMealForTime = async (mealTime, plan, durationPlan) => {
    const meals = await mealModel.find({
      type: mealType,
      plan: plan,
      mealFor: mealTime,
    });

    if (!meals.length)
      throw new Error(`No matching meals found for ${mealTime}`);

    const startDateObj = new Date(startDate);
    let totalDays =
      durationPlan === "1-week" ? 7 : durationPlan === "1-month" ? 30 : 3;

    const schedule = [];
    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(startDateObj);
      currentDay.setDate(startDateObj.getDate() + i);

      const formattedDate = currentDay.toISOString().split("T")[0];
      const mealIndex = i % meals.length; // Rotate through meals

      schedule.push({
        date: formattedDate,
        meal: meals[mealIndex],
        mealTime: mealTime, // Store whether it's lunch or dinner
      });
    }
    return schedule;
  };

  // Fetch schedules for lunch and dinner if available
  if (mealPlans.lunch) {
    const lunchSchedule = await getMealForTime(
      "Lunch",
      mealPlans.lunch,
      duration.lunch
    );
    generatedSchedules.push(...lunchSchedule);
  }

  if (mealPlans.dinner) {
    const dinnerSchedule = await getMealForTime(
      "Dinner",
      mealPlans.dinner,
      duration.dinner
    );
    generatedSchedules.push(...dinnerSchedule);
  }

  return generatedSchedules;
};

// Controller function to handle meal schedule requests
const createMealSchedule = async (req, res) => {
  try {
    const userData = req.body;
    const mealSchedule = await generateMealSchedule(userData);
    res.json(mealSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createMealSchedule;
