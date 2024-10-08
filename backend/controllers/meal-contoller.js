import mealModel from "../models/meal-model.js";

const getMealData = async (req, res) => {
  const { startDate, endDate, mealType, dietaryPreference } = req.body;

  try {
    // Query for meals based on type and dietary preference
    const meals = await mealModel.find({
      type: mealType,
      dietary: dietaryPreference,
    });

    // Check if meals are found
    if (meals.length === 0) {
      return res
        .status(404)
        .json({ message: "No meals found for the selected criteria." });
    }

    // Map meals to the date range
    const mealSchedule = {};
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      // Assign the meals for this date
      mealSchedule[currentDate.toDateString()] = meals;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.status(200).json(mealSchedule);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export default getMealData;
