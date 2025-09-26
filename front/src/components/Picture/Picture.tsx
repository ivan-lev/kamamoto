import type CSS from 'csstype';
import './Picture.scss';

interface Props {
	src: string;
	srcMobile?: string;
	fallback?: string;
	alt: string;
	query?: string;
	style?: CSS.Properties;
	additionalClass?: string;
	fetchpriority?: 'high' | 'low';
	loading?: 'eager' | 'lazy';
}

export default function Picture({ src, srcMobile, fallback = '/images/error.webp', alt = 'alt', query = '(max-width: 480px)', style = { aspectRatio: '3 / 2', width: '100%' }, additionalClass, fetchpriority = 'low', loading = 'lazy' }: Props) {
	return (
		<picture className={ `picture ${additionalClass || ''}` } style={ style }>
			{ srcMobile && <source srcSet={ srcMobile } media={ query } /> }
			<img
				className="picture__img"
				alt={ alt }
				src={ src }
				fetchPriority={ fetchpriority }
				loading={ loading }
				onError={ e => (e.currentTarget.src = fallback) }
			/>
		</picture>
	);
};
