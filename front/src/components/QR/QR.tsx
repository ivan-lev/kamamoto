import { QRCodeSVG } from 'qrcode.react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useParams } from 'react-router';
import logoSvgPaths from '@/variables/logoSvgPaths';
import './QR.scss';

export default function QR() {
	const { exhibit } = useParams();
	const link = window.location.href;

	const imageSettings = {
		src: '/favicon.svg',
		height: 50,
		width: 50,
		excavate: true,
		opacity: 1,
		crossOrigin: undefined,
	};

	const svgComponent = (
		<QRCodeSVG
			value={link}
			size={150}
			bgColor="#ffffffdd"
			fgColor="#000000cc"
			title={`Камамото: qr-ссылка для лота ${exhibit}`}
			minVersion={5}
			marginSize={2}
			imageSettings={imageSettings}
			xmlns="http://www.w3.org/2000/svg"
		/>
	);

	// make string from component code
	const svgString = renderToStaticMarkup(svgComponent);
	// remove link to svg file from string using regexp
	const svgStringWithoutImage = svgString.replace(/<image.*<\/image>/, '');
	// insert logo as svg paths just before ending </svg> tag
	const resultingSvgCode = svgStringWithoutImage.slice(0, -6) + logoSvgPaths + svgStringWithoutImage.slice(-6);

	const handleDownload = () => {
		const blob = new Blob([resultingSvgCode], { type: 'image/svg+xml' });
		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = `${exhibit}.svg`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(downloadLink.href);
	};

	return (
		<div className="qr">
			<a className="qr__link" onClick={handleDownload}>
				{ svgComponent }
			</a>
		</div>
	);
}
