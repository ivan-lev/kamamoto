import { Outlet } from 'react-router-dom';
import './Main.scss';

export default function Main() {
	return (
		<main
			className="content"
		>
			<Outlet />
		</main>
	);
};
