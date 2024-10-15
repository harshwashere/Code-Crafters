import scheduleModel from "../models/schedule-model.js";

export const getSchedule = async (req, res) => {
  try {
    const mealData = new scheduleModel({
      ...req.body,
      userId: req.userID, // Add the logged-in user's ID to the schedule data
    });

    await mealData.save();
    res.status(200).json({ message: "Meal scheduled successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error scheduling meal." });
  }
};

//*-----------------------
//* Getting schdeule Summary
//*-----------------------

export const getScheduleData = async (req, res) => {
  try {
    const schedules = await scheduleModel.find({ userId: req.userID }); // Fetch schedules for the logged-in user
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

//*----------------------
//* Delete Schedule
//*----------------------

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await scheduleModel.findOneAndDelete({
      _id: id,
      userId: req.userID,
    });

    if (!deletedSchedule) {
      return res
        .status(404)
        .json({ message: "Schedule not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error });
  }
};

//*-----------------------
//* Update a schedule by ID
//*-----------------------

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await scheduleModel.findOneAndUpdate(
      { _id: id, userId: req.userID },
      { ...req.body },
      { new: true } // Returns the updated document
    );

    if (!updatedSchedule) {
      return res
        .status(404)
        .json({ message: "Schedule not found or not authorized to update" });
    }

    res
      .status(200)
      .json({ message: "Schedule updated successfully", updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error });
  }
};
