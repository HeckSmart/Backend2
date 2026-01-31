import { NextFunction, Request, Response } from "express";
import { DriverSchemesModel } from "../models";

/** GET - List all schemes for a driver (query: driverId) */
const getDriverSchemes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await DriverSchemesModel.findAll({
      where: { driverId },
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

/** GET - Get one scheme by id (param: id) */
const getDriverSchemeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = typeof req.params.id === "string" ? req.params.id : req.params.id?.[0];
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
    const data = await DriverSchemesModel.findByPk(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

/** GET - Get scheme details for a driver (query: driverId) - schemeName, description */
const getDriverSchemeDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await DriverSchemesModel.findOne({
      where: { driverId },
      attributes: ["schemeName", "description"],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

/** GET - Get latest scheme name for a driver (query: driverId) */
const getDriverSchemeName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await DriverSchemesModel.findOne({
      where: { driverId },
      attributes: ["schemeName"],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

/** GET - Get scheme description for a driver (query: driverId) */
const getDriverSchemeDescription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { driverId } = req.query;
    const data = await DriverSchemesModel.findOne({
      where: { driverId },
      attributes: ["description"],
      order: [["created_at", "DESC"]],
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const driverSchemeController = {
  getDriverSchemes,
  getDriverSchemeById,
  getDriverSchemeDetails,
  getDriverSchemeName,
  getDriverSchemeDescription,
};

export default driverSchemeController;
