import type { CartDisplayItem } from '@/components/Cart/Cart';

export function buildCartText(list: CartDisplayItem[], totalPrice: number, deliveryPrice: number): string {
	let text = 'Список благовоний:\n\n';

	list.forEach((item) => {
		if (item.incense.inStock) {
			text += `- ${item.incense.title} / ${item.incense.manufacturer.title}: ${item.count}шт на ${item.count * item.incense.pricePerStick}р\n`;
		}
	});

	text += '\n==============================\n\n';
	text += `Благовония: ${totalPrice}р, доставка: ${deliveryPrice}р\n`;
	text += `Итого: ${totalPrice + deliveryPrice}р`;

	return text;
}
