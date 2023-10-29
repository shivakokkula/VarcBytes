const express = require("express");
const router = express.Router()
const Feedback = require("../models/feedback.model")
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

router.post("/", async (req, res, next) => {
  try {
    feedback = new Feedback();
    feedback.feedback = req.body;
    await feedback.save();
    res.status(201).json(`Feedback is successully created`);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find();
    if (feedbacks) {
      return res.status(200).json(feedbacks);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback) {
      return res.status(200).json(feedback);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id,{feedback:req.body});
    if (!feedback) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    res.status(201).json(`Feedback is successully updated`);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }
    res.status(200).json("Feedback is successully deleted");
  } catch (e) {
    next(e);
  }
});

module.exports = router