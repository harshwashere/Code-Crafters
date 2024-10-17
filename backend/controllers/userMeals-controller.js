import SuggestedMeal from "../models/user-meals.js"; // Use `import` instead of `require`

// Save suggested meals for a user
export const saveSuggestedMeal = async (req, res) => {
  try {
    const mealsData = req.body;
    const userId = mealsData[0]?.userId;

    if (!userId || !mealsData || mealsData.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and meals data are required." });
    }

    // Prepare the meal data for saving
    const mealsToSave = mealsData.map((meal) => ({
      userId, // Use the userId from the first meal item
      date: meal.date,
      mealTime: meal.mealTime,
      meal: {
        _id: meal.meal._id, // Accessing the nested meal properties correctly
        name: meal.meal.name,
        type: meal.meal.type,
        plan: meal.meal.plan,
        mealFor: meal.meal.mealFor,
        price: meal.meal.price,
        meals: meal.meal.meals, // Ensure meals array is included correctly
      },
      quantity: meal.quantity,
    }));

    // Save all meals in bulk
    const savedMeals = await SuggestedMeal.insertMany(mealsToSave);

    res.status(201).json({ message: "Meals saved successfully!", savedMeals });
  } catch (error) {
    console.error("Error saving meals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch meals for a specific user
export const getUserMeals = async (req, res) => {
  try {
    const { userId } = req.params;

    const meals = await SuggestedMeal.find({ userId });

    if (!meals || meals.length === 0) {
      return res.status(404).json({ message: "No meals found for this user." });
    }

    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a specific meal by ID
export const deleteMeal = async (req, res) => {
  try {
    const { mealId } = req.params;

    const meal = await SuggestedMeal.findByIdAndDelete(mealId);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    res.status(200).json({ message: "Meal deleted successfully." });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
