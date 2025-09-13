import { useState } from 'react';
import './Slide.scss';

interface Props {
	src: string;
	fallback: string;
	fetchpriority?: 'high' | 'low';
	loading: 'eager' | 'lazy';
}

const style = {
	aspectRatio: '3 / 2',
	width: '100%',
};

export default function Slide({ src, fallback, fetchpriority = 'low', loading = 'lazy' }: Props) {
	const [srcToRender, setSrcToRender] = useState<string>(src);
	return (
		<img
			className="slide"
			alt="слайд"
			src={ srcToRender }
			style={ style }
			fetchpriority={ fetchpriority }
			loading={ loading }
			onError={ () => setSrcToRender(fallback) }
		>

		</img>
	)
	;
};
