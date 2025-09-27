import OpeningScreen from '@/components/OpeningScreen/OpeningScreen';
import Partners from '@/components/Partners/Partners';
import SliderMain from '@/components/SliderMain/SliderMain';
import Statistics from '@/components/Statistics/Statistics';
import { homepageSliderImages } from '@/variables/variables';
import './HomePage.scss';

interface Props {
	isFirstRender: boolean;
	setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomePage({ isFirstRender, setIsFirstRender }: Props) {
	return (
		<>
			{ isFirstRender && <OpeningScreen setIsFirstRender={ setIsFirstRender } /> }
			<div className="container container--background-transparent">
				<h1 className="title title--homepage">Камамото - японская керамика</h1>
			</div>
			<SliderMain slides={ homepageSliderImages } />
			<Statistics />
			<Partners />
		</>
	);
}
