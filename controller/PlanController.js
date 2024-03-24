const Plan = require("../models/PlanModel");

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json({
      success: true,
      plans: plans || [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNewPlan = async (req, res) => {
  try {
    const { name, amount, duration } = req.body;
    const existingPlan = await Plan.findOne({ name });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: "Plan already exists",
      });
    }

    const newPlan = await Plan.create({ name, amount, duration });

    if (newPlan) {
      res.status(200).json({
        success: true,
        message: "Plan created successfully",
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPlans, addNewPlan };
