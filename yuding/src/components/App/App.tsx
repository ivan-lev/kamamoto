import { Route, Routes } from 'react-router';
import Cart from '@/components/Cart/Cart';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HomePage from '@/components/HomePage/HomePage';
import Incense from '@/components/Incense/Incense';
import Main from '@/components/Main/Main';
import Manufacturer from '@/components/Manufacturer/Manufacturer';
import './App.scss';

export default function YuDing() {
	return (
		<>
			<Header />
			{ /* <Logo /> */ }
			{ /* <CartIcon /> */ }

			<Routes>
				<Route path="/" element={ <Main /> }>

					<Route index element={ <HomePage /> } />

					<Route path="cart/" element={ <Cart /> } />
					<Route path=":manufacturerParam/" element={ <Manufacturer /> } />
					<Route path=":manufacturerParam/:incenseParam/" element={ <Incense /> } />
				</Route>
			</Routes>

			<Footer />
		</>
	);
}
