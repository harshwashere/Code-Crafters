import scheduleModel from "../models/schedule-model.js"

export const getSchedule = async(req,res) => {
    try {
        const mealData = new scheduleModel(req.body);
        await mealData.save();
        res.status(200).json({ message: "Meal scheduled successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error scheduling meal." });
      }
}

export const getScheduleData = async(req,res) => {
  try {
    const schedules = await scheduleModel.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
}


// router.get('/all', async (req, res) => {
//   try {
//     const schedules = await Schedule.find();
//     res.status(200).json(schedules);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching schedules', error });
//   }
// });