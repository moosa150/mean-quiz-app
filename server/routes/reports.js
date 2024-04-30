const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Report = require("../model/reports");

router.post("/add-report", authMiddleware, async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    return res.json(200, {
      message: "Report added succesfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.post("/get-all-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({}).populate("exam").populate("user");

    return res.json(200, {
      message: "Report fetched succesfully",
      success: true,
      data: reports,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.post("/get-all-reports-by-user", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId })
      .populate("exam")
      .populate("user");
    return res.json(200, {
      message: "Report fetched succesfully",
      success: true,
      data: reports,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
