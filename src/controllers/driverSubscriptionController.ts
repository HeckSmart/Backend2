import { NextFunction, Request, Response } from "express";
import { driverSubscriptionModel } from "../models/driverSubscription";

const getDriverSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findAll({
      where: {
        driverId: driverId,
      },
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getDriverSubscriptionEndDate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["endDate"],
      order: [["endDate", "DESC"]],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getDriverSubscriptionStartDate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["startDate"],
      order: [["startDate", "ASC"]],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getDriverSubscriptionPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["subscriptionPrice"],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getDriverSubscriptionDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: [
        "subscriptionName",
        "description",
        "startDate",
        "endDate",
        "subscriptionPrice",
      ],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const  getDriverSubscriptionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await driverSubscriptionModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["status"],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const driverSubscriptionController = {
  getDriverSubscription,
  getDriverSubscriptionEndDate,
  getDriverSubscriptionStartDate,
  getDriverSubscriptionPrice,
  getDriverSubscriptionDetails,
  getDriverSubscriptionStatus,
};

export default driverSubscriptionController;
