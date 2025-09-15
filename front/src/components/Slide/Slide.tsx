import './Slide.scss';

interface Props {
	src: string;
	fallback?: string;
	fetchpriority?: 'high' | 'low';
	loading?: 'eager' | 'lazy';
}

const style = { aspectRatio: '3 / 2', width: '100%' };

export default function Slide({ src, fallback = '/images/error.webp', fetchpriority = 'low', loading = 'lazy' }: Props) {
	return (
		<img
			className="slide"
			alt="слайд"
			src={ src }
			style={ style }
			fetchPriority={ fetchpriority }
			loading={ loading }
			onError={ e => (e.currentTarget.src = fallback) }
		/>
	)
	;
};
