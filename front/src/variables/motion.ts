import { easeOut } from 'motion/react';

const variants = Object.freeze({
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
	scaleZero: { scaleY: 0 },
	scaleOne: { scaleY: 1 },
});

const transitions = Object.freeze({
	common: { duration: 0.5, delay: 0, ease: [easeOut] },
});

export const motionSettings = Object.freeze({
	variants,
	transitions,
});
