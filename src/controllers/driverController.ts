import { driverOnboardingData } from "../constants/driverOnboardingData";
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

        res.status(200).json({ status: "success", data: drivers });
    } catch (error) {
        next(error);
    }
}

const getDriverDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {driverId} = req.query;
        const driver = await DriverModel.findByPk(driverId as string);
        res.status(200).json({ status: "success", data: driver });
    } catch (error) {
        next(error);
    }
}

const getDriverOnboardingData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {driverId} = req.query;

        const driverData = driverOnboardingData.drivers.find((driver: any) => driver.driverId === driverId) as unknown as any;

        if(!driverData){
            return res.status(200).json({ status: "success", data: {driverId: driverId} });
        }

        res.status(200).json({ status: "success", data: driverData });
    } catch (error) {
        next(error);
    }
}

const driverController = {
    getDriverSwapCount,
    getDriverOnboardingData,
    getDriverDetails,
}

export default driverController;