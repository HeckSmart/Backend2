import { DriverQueriesModel } from "../models";
import { NextFunction, Request, Response } from "express";

const getDriverQueries = async (req: Request, res: Response,next: NextFunction) => {
    try{
        const {driverId, language, action} = req.query;
        const whereClause: any = {};

        if(driverId){
            whereClause.driverId = driverId;
        }

        if(language){
            whereClause.language = language;
        }

        if(action){
            whereClause.action = action;
        }

        const data = await DriverQueriesModel.findAll({ where: whereClause });

        res.status(200).json({ success: true, data: data });
    } catch (error) {
        next(error);
    }
}

const driverQueriesController = {
    getDriverQueries
}

export default driverQueriesController;