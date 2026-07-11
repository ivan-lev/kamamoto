import { useEffect } from 'react';
import { useLocation } from 'react-router';

const WAIT_TIMEOUT = 5000;

export default function ScrollToHash() {
	const { hash } = useLocation();

	useEffect(() => {
		if (!hash)
			return;

		const element = document.querySelector(hash);
		if (element) {
			element.scrollIntoView({ behavior: 'auto' });
			return;
		}

		// element might not be rendered yet if the page loads its content asynchronously
		const observer = new MutationObserver(() => {
			const lateElement = document.querySelector(hash);
			if (lateElement) {
				lateElement.scrollIntoView({ behavior: 'auto' });
				observer.disconnect();
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
		const timeout = setTimeout(() => observer.disconnect(), WAIT_TIMEOUT);

		return () => {
			observer.disconnect();
			clearTimeout(timeout);
		};
	}, [hash]);

	return null;
}
