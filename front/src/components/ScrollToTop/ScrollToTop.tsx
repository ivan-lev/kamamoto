import ScrollToTop from 'react-scroll-to-top';

export default function ScrollToTopButton() {
	return (
		<ScrollToTop
			smooth
			top={ 300 }
			component={ <img className="link__icon" src="/__spritemap#sprite-arrow-up-view" alt="Иконка" /> }
			className="custom-styles"
		/>
	);
}
