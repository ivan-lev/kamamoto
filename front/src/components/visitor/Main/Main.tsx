import { Outlet } from 'react-router';
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
