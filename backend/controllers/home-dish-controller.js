import Menu from "../models/menu-model.js";

export const getTiffinData = async (req, res) => {
  try {
    const tiffinaData = await Menu.find({"category": "special tiffin"});

    if (!tiffinaData || tiffinaData.length === 0) {
      return res.status(404).json({ message: "No Tiffin Data Found" });
    }
    return res.status(201).json({ message: tiffinaData });
  } catch (error) {
    console.log("This error is from home-dish-controller.js", error);
  }
};

export const getMenuCategory = async (req, res) => {
  try {
    const menuData = await Menu.find({"category": {$ne: "special tiffin"}}).distinct("category");

    if (!menuData || menuData.length === 0) {
      return res.status(404).json({ message: "No items in menu" });
    }
    return res.status(200).json({ menuData });
  } catch (error) {
    console.log(error);
  }
};

export const getMenuDishByCategory = async (req, res) => {
  try {    
    const dishes = await Menu.find();

    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }

    return res.status(200).json(dishes);
  } catch (error) {
    console.log(error);
  }
};
