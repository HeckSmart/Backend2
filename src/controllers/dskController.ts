import { NextFunction, Request, Response } from "express";
import { getNearestDskCenters as getNearestDskCentersByLocation } from "./locationController";

/** Finds nearest DSK centers by driver location (latitude, longitude). Delegates to locationController. */
const getNearestDskCenters = (req: Request, res: Response, next: NextFunction) =>
    getNearestDskCentersByLocation(req, res, next);

const dskController = {
    getNearestDskCenters
}

export default dskController;