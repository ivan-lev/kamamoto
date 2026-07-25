export function scrollToTop() {
	// don't fight ScrollToHash: if the URL has an anchor, let it own the scroll position
	if (window.location.hash)
		return;

	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'instant',
	});
};
