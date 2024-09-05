import { createSlice, configureStore } from '@reduxjs/toolkit';

// Types
import { Exhibit, Exhibits, defaultExhibit } from '../types/exhibitType';
import { Exhibition, Exhibitions, defaultExhibition } from '../types/exhibitionType';
import { Partner, defaultPartner } from '../types/partnerType';
import { Category, defaultCategory } from '../types/category';

interface adminState {
  isLoggedIn: boolean;
  exhibits: Exhibits;
  exhibitToDisplay: Exhibit;
  exhibitions: Exhibitions;
  exhibitionToDisplay: Exhibition;
  isExhibitionFormShowed: boolean;
  isExistingExhibitionEdited: boolean;
  partners: Partner[];
  partnerToDisplay: Partner;
  isExistingPartnerEdited: boolean;
  categories: Category[];
  categoryToDisplay: Category;
  isExistingCategoryEdited: boolean;
}

const initialState: adminState = {
  isLoggedIn: JSON.parse(localStorage.getItem('kmmtlgn') || 'false'),
  exhibits: [],
  exhibitToDisplay: { ...defaultExhibit },
  exhibitions: [],
  exhibitionToDisplay: { ...defaultExhibition },
  isExhibitionFormShowed: false,
  isExistingExhibitionEdited: false,
  partners: [],
  partnerToDisplay: { ...defaultPartner },
  isExistingPartnerEdited: false,
  categories: [],
  categoryToDisplay: { ...defaultCategory },
  isExistingCategoryEdited: false
};

const adminSlice = createSlice({
  name: 'exhibition',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem('kmmttkn', action.payload);
      localStorage.setItem('kmmtlgn', 'true');
    },

    logout: state => {
      state.isLoggedIn = false;
      localStorage.removeItem('kmmttkn');
      localStorage.removeItem('kmmtlgn');
    },

    setExhibitions: (state, action) => {
      state.exhibitions = action.payload;
    },

    setExhibitionFormShowed: (state, action) => {
      state.isExhibitionFormShowed = action.payload;
    },

    openEmptyExhibitionForm: state => {
      state.exhibitionToDisplay = { ...defaultExhibition, id: state.exhibitions.length + 1 };
      state.isExhibitionFormShowed = true;
    },

    clearExhibitionForm: state => {
      state.exhibitionToDisplay = { ...defaultExhibition, id: state.exhibitions.length + 1 };
    },

    setExhibitionToEdit: (state, action) => {
      state.exhibitionToDisplay =
        state.exhibitions.find(exhibition => exhibition.id === action.payload) || defaultExhibition;
      state.isExhibitionFormShowed = true;
      state.isExistingExhibitionEdited = true;
    },

    setIsExistingExhibitionEdited: (state, action) => {
      state.isExistingExhibitionEdited = action.payload;
    },

    setExhibitionToDisplay: (state, action) => {
      state.exhibitionToDisplay = { ...action.payload };
    },

    setPartners: (state, action) => {
      state.partners = [...action.payload];
    },

    setPartnerToDisplay: (state, action) => {
      state.partnerToDisplay = { ...action.payload };
    },

    clearPartnerForm: state => {
      state.partnerToDisplay = { ...defaultPartner };
    },

    setIsExistingPartnerEdited: (state, action) => {
      state.isExistingPartnerEdited = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = [...action.payload];
    },

    setCategoryToDisplay: (state, action) => {
      state.categoryToDisplay = { ...action.payload };
    },

    clearCategoryForm: state => {
      state.categoryToDisplay = { ...defaultCategory };
    },

    setIsExistingCategoryEdited: (state, action) => {
      state.isExistingCategoryEdited = action.payload;
    }
  }
});

export const {
  login,
  logout,
  setExhibitions,
  setExhibitionFormShowed,
  openEmptyExhibitionForm,
  clearExhibitionForm,
  setExhibitionToEdit,
  setIsExistingExhibitionEdited,
  setExhibitionToDisplay,
  setPartners,
  setPartnerToDisplay,
  clearPartnerForm,
  setIsExistingPartnerEdited,
  setCategories,
  setCategoryToDisplay,
  clearCategoryForm,
  setIsExistingCategoryEdited
} = adminSlice.actions;

const adminStore = configureStore({
  reducer: {
    admin: adminSlice.reducer
  }
});

export default adminStore;

export type AdminRootState = ReturnType<typeof adminStore.getState>;
