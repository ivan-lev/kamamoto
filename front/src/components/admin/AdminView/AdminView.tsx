import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';

import Admin from '@/components/admin/Admin/Admin';
import AdminCategories from '@/components/admin/Categories/Categories';
import AdminCeramicStyles from '@/components/admin/CeramicStyles/CeramicStyles';
import Complectation from '@/components/admin/Complectation/Complectation';
import AdminDictionary from '@/components/admin/Dictionary/Dictionary';
import AdminExhibitions from '@/components/admin/Exbitions/Exhibitions';
import ExhibitsList from '@/components/admin/ExhibitsList/ExhibitsList';
import Filters from '@/components/admin/Filters/Filters';
import AdminLetters from '@/components/admin/Letters/Letters';
import Login from '@/components/admin/Login/Login';
import Markers from '@/components/admin/Markers/Markers';
import AdminPartners from '@/components/admin/Partners/Partners';
import Potters from '@/components/admin/Potters/Potters';
import AdminStatistics from '@/components/admin/Statistics/Statistics';
import { getAdminStore } from '@/slices/admin';

export default function AdminView() {
	return (
		<Provider store={ getAdminStore() }>
			<Routes>
				<Route path="login" element={ <Login /> } />
				<Route path="/" element={ <Admin /> }>
					<Route index element={ <AdminStatistics /> } />
					<Route
						path="exhibits"
						element={ (
							<>
								<Filters />
								<ExhibitsList />
							</>
						) }
					/>
					<Route path="exhibitions" element={ <AdminExhibitions /> } />
					<Route path="partners" element={ <AdminPartners /> } />
					<Route path="categories" element={ <AdminCategories /> } />
					<Route path="letters" element={ <AdminLetters /> } />
					<Route path="ceramic-styles" element={ <AdminCeramicStyles /> } />
					<Route path="features" element={ <AdminCeramicStyles /> } />
					<Route path="complectation" element={ <Complectation /> } />
					<Route path="potters" element={ <Potters /> } />
					<Route path="dictionary" element={ <AdminDictionary /> } />
					<Route path="map" element={ <Markers /> } />
				</Route>
			</Routes>
		</Provider>
	);
}
