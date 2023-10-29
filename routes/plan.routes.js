const express = require("express");
const router = express.Router()
const Plan = require("../models/plan.model")
const ApiError = require('../utils/ApiError');

router.post("/", async (req, res, next) => {
  try {
    const plan = await Plan.create(req.body);
    if (!plan) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Plan not created due to internal server error');
    }
    res.status(201).json(`Plan is successully created`);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const plans = await Plan.find();
    if (plans) {
      return res.status(200).json(plans);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan) {
      return res.status(200).json(plan);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id,{services:req.body});
    if (!plan) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    res.status(201).json(`Plan is successully updated`);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    res.status(200).json("Plan is successully deleted");
  } catch (e) {
    next(e);
  }
});

module.exports = router