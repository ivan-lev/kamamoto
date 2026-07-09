import type { MarkerGroup } from '@/components/visitor/Map/map.types';
import type { Marker } from '@/types/marker';
import { checkResponseStatus } from '@/utils/api/api.common';
import { PATHS } from '../../variables/variables';

const {
	BASE_API_URL,
	MAPS,
} = PATHS;

async function getMarkers(): Promise<Marker[]> {
	const response = await fetch(`${BASE_API_URL}/${MAPS}/`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function getMarkerGroups(): Promise<MarkerGroup[]> {
	const response = await fetch(`${BASE_API_URL}/${MAPS}/groups`, {
		method: 'GET',
	});
	return checkResponseStatus(response);
}

async function createMarker(token: string, marker: Marker) {
	const response = await fetch(`${BASE_API_URL}/${MAPS}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(marker),
	});
	return checkResponseStatus(response);
}

async function updateMarker(token: string, marker: Marker) {
	const response = await fetch(`${BASE_API_URL}/${MAPS}/${marker._id}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(marker),
	});
	return checkResponseStatus(response);
}

async function deleteMarker(token: string, id: string) {
	const response = await fetch(`${BASE_API_URL}/${MAPS}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return checkResponseStatus(response);
}

export const maps = {
	getMarkers,
	getMarkerGroups,
	createMarker,
	updateMarker,
	deleteMarker,
};
