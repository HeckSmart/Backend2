import { NextFunction, Request, Response } from "express";
import { DskModel } from "../models";

const getNearestDskCenters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { latitude, longitude } = req.query;
        const data = await DskModel.findAll({
            where: {
                latitude: latitude,
                longitude: longitude,
            },
        });
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(error);
    }
}

const dskController = {
    getNearestDskCenters
}

export default dskController;