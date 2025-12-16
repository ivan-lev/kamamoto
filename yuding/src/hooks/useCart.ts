import { useEffect, useState } from 'react';

export interface Cart {
	[manufacturer: string]: {
		[incense: string]: number,
	};
}

export function useCart() {
	const [cart, setCart] = useState<Cart>(() => {
		try {
			return JSON.parse(localStorage.getItem('yuding') ?? '{}');
		}
		catch {
			return {};
		}
	});

	useEffect(() => {
		localStorage.setItem('yuding', JSON.stringify(cart));
	}, [cart]);

	const addItem = (manufacturer: string, incense: string, count: number) => {
		setCart(prev => ({
			...prev,
			[manufacturer]: {
				...(prev[manufacturer] ?? {}),
				[incense]: count,
			},
		}));
	};

	const removeItem = (manufacturer: string, incense: string) => {
		setCart((prev) => {
			const items = { ...(prev[manufacturer] ?? {}) };
			delete items[incense];

			if (!Object.keys(items).length) {
				const next = { ...prev };
				delete next[manufacturer];
				return next;
			}

			return { ...prev, [manufacturer]: items };
		});
	};

	const getItemCount = (manufacturer: string, incense: string) =>
		cart[manufacturer]?.[incense] ?? 0;

	return { cart, addItem, removeItem, getItemCount };
}
