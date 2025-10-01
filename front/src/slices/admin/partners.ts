import type { Partner } from '@/types/partnerType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultPartner } from '@/types/partnerType';

interface PartnersState {
	partners: Partner[];
	partnerToEdit: Partner;
	isExistingPartnerEdited: boolean;
}

const initialState: PartnersState = {
	partners: [],
	partnerToEdit: { ...defaultPartner },
	isExistingPartnerEdited: false,
};

const partners = createSlice({
	name: 'partners',
	initialState,
	reducers: {
		setPartners: (state, action) => {
			state.partners = [...action.payload];
		},

		setPartnerToEdit: (state, action) => {
			state.partnerToEdit = { ...action.payload };
		},

		clearPartnerForm: (state) => {
			state.partnerToEdit = { ...defaultPartner };
		},

		setIsExistingPartnerEdited: (state, action) => {
			state.isExistingPartnerEdited = action.payload;
		},
	},
});

export const {
	setPartners,
	setPartnerToEdit,
	clearPartnerForm,
	setIsExistingPartnerEdited,
} = partners.actions;

export default partners.reducer;
