import { Op } from "sequelize";
import { TransactionsModel } from "../models";
import { NextFunction, Request, Response } from "express";

const lastSwapPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await TransactionsModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["swapPrice"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getSwapHistoryByDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId, startDate, endDate } = req.query;
    const data = await TransactionsModel.findAll({
      where: {
        driverId: driverId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const getLastBatteryIssued = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await TransactionsModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["batteriesIssued"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

export const getLastSwapPartnerId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await TransactionsModel.findOne({
      where: {
        driverId: driverId,
      },
      attributes: ["partnerId"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

export const getLastSwapHistoryInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { driverId } = req.query;
    const data = await TransactionsModel.findOne({
      where: {
        driverId: driverId,
      },
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

const transactionController = {
  lastSwapPrice,
  getSwapHistoryByDateRange,
  getLastBatteryIssued,
  getLastSwapPartnerId,
  getLastSwapHistoryInvoice,
};

export default transactionController;
