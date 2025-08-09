import SliderMain from '@/components/SliderMain/SliderMain';
import Statistics from '@/components/Statistics/Statistics';
import { homepageSliderImages } from '@/variables/variables';
import Partners from '../Partners/Partners';
import './HomePage.scss';

export default function HomePage() {
	return (
		<>
			<div className="container container--background-transparent">
				<h1 className="title title1">Камамото - японская керамика</h1>
			</div>
			<SliderMain slides={homepageSliderImages} />
			<Statistics />
			<Partners />
		</>
	);
}
