import { useEffect } from 'react';
import './OpeningScreen.scss';

interface Props {
	setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OpeningScreen({ setIsFirstRender }: Props) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		setTimeout(() => {
			document.body.style.overflow = 'revert';
			setIsFirstRender(false);
		}, 4000);
	}, []);

	return (
		<section className="opening-screen">
			<div className="opening-screen__content">
				<img className="opening-screen__img" src="/files/kamamoto-logo.svg" alt="logo" fetchpriority="high" loading="eager"></img>
			</div>
		</section>
	);
}
