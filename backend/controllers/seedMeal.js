import express from "express";
import mealModel from "../models/meal-model.js";


const seedMeals = async (req, res) => {
  const meals = [
    { name: "Vegetable Biryani", type: "lunch", dietary: "veg" },
    { name: "Chicken Curry", type: "lunch", dietary: "non-veg" },
    { name: "Dal Tadka", type: "dinner", dietary: "veg" },
    { name: "Fish Fry", type: "dinner", dietary: "non-veg" },
  ];

  try {
    await mealModel.insertMany(meals);
    res.status(200).send("Sample meals added");
  } catch (error) {
    res.status(500).send("Error adding sample meals");
  }
};

export default seedMeals;
