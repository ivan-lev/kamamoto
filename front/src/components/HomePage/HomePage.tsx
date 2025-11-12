import Partners from '@/components/Partners/Partners';
import Seo from '@/components/Seo/Seo';
import SliderMain from '@/components/SliderMain/SliderMain';
import Statistics from '@/components/Statistics/Statistics';
import { homepageSliderImages } from '@/variables/variables';
import './HomePage.scss';

export default function HomePage() {
	return (
		<>
			<Seo title="Камамото: японская керамика" description="Частная коллекция японской керамики и предметов ручной работы, выполненных с применением традиционных техник а также сайт, посвященный японской керамике" />

			<div className="container container--background-transparent">
				<h1 className="title title--homepage">Камамото - японская керамика</h1>
			</div>

			<SliderMain slides={ homepageSliderImages } />
			<Statistics />
			<Partners />
		</>
	);
}
