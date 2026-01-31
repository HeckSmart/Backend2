import { NextFunction, Request, Response } from 'express';
import models from '../models';
import { PartnerStatus } from '../models/partners';
import { sortByDistanceFrom } from '../utils/geo';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function parseLocationQuery(req: Request): { lat: number; lng: number; limit: number; radiusKm?: number } | null {
  const lat = Number(req.query.latitude ?? req.query.lat);
  const lng = Number(req.query.longitude ?? req.query.lng);
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return null;
  }
  let limit = Number(req.query.limit);
  if (Number.isNaN(limit) || limit <= 0) limit = DEFAULT_LIMIT;
  limit = Math.min(limit, MAX_LIMIT);
  let radiusKm: number | undefined;
  if (req.query.radiusKm != null) {
    const r = Number(req.query.radiusKm);
    if (!Number.isNaN(r) && r > 0) radiusKm = r;
  }
  return { lat, lng, limit, radiusKm };
}

export const getNearestPartnerStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = parseLocationQuery(req);
    if (!params) {
      return res.status(400).json({
        status: 'fail',
        message: 'Query params "latitude" and "longitude" are required (numbers). Optional: limit, radiusKm.',
      });
    }
    const { lat, lng, limit, radiusKm } = params;

    const partners = await models.Partner.findAll({
      where: { status: PartnerStatus.active },
      attributes: ['id', 'name', 'nameHindi', 'address', 'latitude', 'longitude', 'businessType', 'startTime', 'endTime', 'noOfBatteries', 'deployedBatteries', 'partnerType', 'stationType', 'liveDate'],
      raw: true,
    });

    let withDistance = sortByDistanceFrom(partners as Array<{ latitude: number; longitude: number }>, lat, lng);
    if (radiusKm != null) {
      withDistance = withDistance.filter((p) => p.distanceKm <= radiusKm);
    }
    const data = withDistance.slice(0, limit);

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getNearestDskCenters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = parseLocationQuery(req);
    if (!params) {
      return res.status(400).json({
        status: 'fail',
        message: 'Query params "latitude" and "longitude" are required (numbers). Optional: limit, radiusKm.',
      });
    }
    const { lat, lng, limit, radiusKm } = params;

    const centers = await models.DskCenter.findAll({
      attributes: ['id', 'name', 'latitude', 'longitude', 'address'],
      raw: true,
    });

    let withDistance = sortByDistanceFrom(centers as Array<{ latitude: number; longitude: number }>, lat, lng);
    if (radiusKm != null) {
      withDistance = withDistance.filter((p) => p.distanceKm <= radiusKm);
    }
    const data = withDistance.slice(0, limit);

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

export const getNearestInactivityCenters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = parseLocationQuery(req);
    if (!params) {
      return res.status(400).json({
        status: 'fail',
        message: 'Query params "latitude" and "longitude" are required (numbers). Optional: limit, radiusKm.',
      });
    }
    const { lat, lng, limit, radiusKm } = params;

    const centers = await models.InactivityCenter.findAll({
      attributes: ['id', 'name', 'latitude', 'longitude', 'address'],
      raw: true,
    });

    let withDistance = sortByDistanceFrom(centers as Array<{ latitude: number; longitude: number }>, lat, lng);
    if (radiusKm != null) {
      withDistance = withDistance.filter((p) => p.distanceKm <= radiusKm);
    }
    const data = withDistance.slice(0, limit);

    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};
