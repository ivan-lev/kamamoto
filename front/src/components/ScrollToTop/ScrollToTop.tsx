import ScrollToTop from 'react-scroll-to-top';

export default function ScrollToTopButton() {
	return (
		<ScrollToTop
			smooth
			top={300}
			component={<img className="link__icon" src="/icons/link-arrow-up.svg" />}
			className="custom-styles"
		/>
	);
}
