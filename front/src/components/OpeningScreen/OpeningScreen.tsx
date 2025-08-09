import { useEffect } from 'react';
import './OpeningScreen.scss';

export default function OpeningScreen() {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		setTimeout(() => {
			document.body.style.overflow = 'revert';
		}, 4000);
	}, []);
	return (
		<section className="opening-screen">
			<div className="opening-screen__content">
				<img className="opening-screen__img" src="/files/kamamoto-logo.svg" alt="logo"></img>
			</div>
		</section>
	);
}
