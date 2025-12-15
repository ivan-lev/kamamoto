import { Route, Routes } from 'react-router';
import Footer from '@/components/Footer/Footer';
import HomePage from '@/components/HomePage/HomePage';
import Incense from '@/components/Incense/Incense';
import Logo from '@/components/Logo/Logo';
import Main from '@/components/Main/Main';
import Manufacturer from '@/components/Manufacturer/Manufacturer';
import './App.scss';

export default function YuDing() {
	return (
		<>
			<Logo />

			<Routes>
				<Route path="/" element={ <Main /> }>

					<Route index element={ <HomePage /> } />
					<Route path=":manufacturerParam/" element={ <Manufacturer /> } />
					<Route path=":manufacturerParam/:incenseParam/" element={ <Incense /> } />
				</Route>
			</Routes>

			<Footer />
		</>
	);
}
