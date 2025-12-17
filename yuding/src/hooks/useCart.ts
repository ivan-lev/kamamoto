import { useEffect, useState } from 'react';

const STORAGE_KEY = 'yuding';

export interface CartItem {
	manufacturer: string;
	incense: string;
	count: number;
}

export function useCart() {
	const [items, setItems] = useState<CartItem[]>(() => {
		try {
			return JSON.parse(
				localStorage.getItem(STORAGE_KEY) ?? '[]',
			) as CartItem[];
		}
		catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items]);

	const addItem = (
		manufacturer: string,
		incense: string,
		count: number,
	) => {
		setItems((prev) => {
			const index = prev.findIndex(
				item =>
					item.manufacturer === manufacturer
					&& item.incense === incense,
			);

			// Товар уже есть → обновляем количество
			if (index !== -1) {
				const next = [...prev];
				next[index] = { ...next[index], count };
				return next;
			}

			// Новый incense (даже если manufacturer тот же)
			return [...prev, { manufacturer, incense, count }];
		});
	};

	const removeItem = (manufacturer: string, incense: string) => {
		setItems(prev =>
			prev.filter(
				i =>
					!(
						i.manufacturer === manufacturer
						&& i.incense === incense
					),
			),
		);
	};

	const getItemCount = (manufacturer: string, incense: string) =>
		items.find(
			i =>
				i.manufacturer === manufacturer
				&& i.incense === incense,
		)?.count ?? 0;

	return {
		items,
		addItem,
		removeItem,
		getItemCount,
	};
}
