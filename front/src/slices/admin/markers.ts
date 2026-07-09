import type { Marker } from '@/types/marker';
import { createSlice } from '@reduxjs/toolkit';
import { defaultMarker } from '@/types/marker';

interface Markers {
	markersList: Marker[];
	markerToEdit: Marker;
	isExistingMarkerEdited: boolean;
}

const initialState: Markers = {
	markersList: [],
	markerToEdit: { ...defaultMarker },
	isExistingMarkerEdited: false,
};

const markers = createSlice({
	name: 'markers',
	initialState,
	reducers: {
		setMarkers: (state, action: { payload: Marker[] }) => {
			state.markersList = [...action.payload];
		},

		setMarkerToEdit: (state, action: { payload: Marker }) => {
			state.markerToEdit = { ...action.payload };
		},

		clearMarkerForm: (state) => {
			state.markerToEdit = { ...defaultMarker };
		},

		setIsExistingMarkerEdited: (state, action: { payload: boolean }) => {
			state.isExistingMarkerEdited = action.payload;
		},
	},
});

export const {
	setMarkers,
	setMarkerToEdit,
	clearMarkerForm,
	setIsExistingMarkerEdited,
} = markers.actions;

export default markers.reducer;
