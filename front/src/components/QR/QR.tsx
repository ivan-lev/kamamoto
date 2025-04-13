import { QRCodeSVG } from 'qrcode.react';

export default function QR() {
	const link = window.location.href;

	const imageSettings = {
		src: '/favicon.png',
		height: 50,
		width: 50,
		excavate: true,
		opacity: 1,
		crossOrigin: undefined,
	};

	return (
		<QRCodeSVG
			value={link}
			size={150}
			bgColor="#ffffffdd"
			fgColor="#000000cc"
			title="qr"
			minVersion={5}
			marginSize={2}
			imageSettings={imageSettings}
		/>
	);
}
