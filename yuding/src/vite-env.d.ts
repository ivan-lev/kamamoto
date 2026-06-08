/// <reference types="vite/client" />

declare module '*.css' {
	const content: string;
	export default content;
}

// Or for side-effect imports
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/thumbs';
