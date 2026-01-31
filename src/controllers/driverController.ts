import { DriverModel } from "../models";
import { NextFunction, Request, Response } from "express";

const getDriverSwapCount = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {driverId} = req.query;

        console.log(driverId);

        const drivers = await DriverModel.findAll({
            where: {
                id: driverId
            },
            attributes: ['id',  'swapCount']
        });

        res.status(200).json({ success: true, data: drivers });
    } catch (error) {
        next(error);
    }
}

const driverController = {
    getDriverSwapCount
}

export default driverController;