import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '@/slices/visitor/categories';
import categoryReducer from '@/slices/visitor/category';
import complectationsReducer from '@/slices/visitor/complectations';
import exhibitsReducer from '@/slices/visitor/exhibit';
import exhibitionsReducer from '@/slices/visitor/exhibitions';
import letterReducer from '@/slices/visitor/letters';
import listReducer from '@/slices/visitor/list';
import partnersReducer from '@/slices/visitor/partners';
import statisticsReducer from '@/slices/visitor/statistics';

function createVisitorStore() {
	return configureStore({
		reducer: {
			categories: categoriesReducer,
			category: categoryReducer,
			complectations: complectationsReducer,
			exhibit: exhibitsReducer,
			exhibitions: exhibitionsReducer,
			letters: letterReducer,
			list: listReducer,
			partners: partnersReducer,
			statistics: statisticsReducer,
		},
	});
}

let visitorStore: ReturnType<typeof createVisitorStore> | undefined;

export function getVisitorStore() {
	if (!visitorStore) {
		visitorStore = createVisitorStore();
	}

	return visitorStore;
}

export type RootState = ReturnType<ReturnType<typeof createVisitorStore>['getState']>;
