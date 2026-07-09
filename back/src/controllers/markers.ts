import type { NextFunction, Request, Response } from 'express';
import type { MarkerGroup, Marker as MarkerType, PublicMarker } from '../types/marker';
import { handleMongooseError } from '../middlewares//error-handler-mongoose';
import Marker from '../models/marker';
import { ERROR_MESSAGES } from '../variables/messages';

async function getMarkers(req: Request, res: Response, next: NextFunction) {
	try {
		const markers = await Marker.find({});
		res.send(markers);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MARKER); }
}

async function getMarkerGroups(req: Request, res: Response, next: NextFunction) {
	try {
		const markers = await Marker.find({ isActive: true }).select('-_id -isActive').lean<(PublicMarker & { groupName: string })[]>();

		const groups = markers.reduce<MarkerGroup[]>((groups, marker) => {
			const { groupName, ...markerData } = marker;
			const group = groups.find(group => group.groupName === groupName);

			if (group) {
				group.markers.push(markerData);
			}
			else {
				groups.push({ groupName, markers: [markerData] });
			}

			return groups;
		}, []);

		res.send(groups);
	}

	catch (error) { return handleMongooseError(error, next, ERROR_MESSAGES.MARKER); }
}

async function createMarker(req: Request, res: Response, next: NextFunction): Promise<void> {
	const marker = req.body;

	try {
		const createdMarker = await Marker.create(marker);
		res.status(201).send(createdMarker);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.MARKER);
	}
}

async function updateMarker(req: Request, res: Response, next: NextFunction): Promise<void> {
	const newMarkerData: MarkerType = req.body;

	try {
		const marker = await Marker.findOneAndUpdate({ _id: req.params._id }, newMarkerData, {
			returnDocument: 'after',
			runValidators: true,
		}).orFail();
		res.send(marker);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.MARKER);
	}
}

async function deleteMarker(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const marker = await Marker.findOneAndDelete({ _id: req.params._id }).orFail().select('_id');
		res.send(marker);
	}
	catch (error) {
		handleMongooseError(error, next, ERROR_MESSAGES.MARKER);
	}
}

export const markers = {
	getMarkers,
	getMarkerGroups,
	createMarker,
	updateMarker,
	deleteMarker,
};
