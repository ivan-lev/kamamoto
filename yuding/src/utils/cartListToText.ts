import type { CartDisplayItem } from '@/components/Cart/Cart';

export function buildCartText(list: CartDisplayItem[], total: number, shippingCost = 300): string {
	let text = 'Список благовоний:\n\n';

	list.forEach((item) => {
		if (item.incense.inStock) {
			text += `- ${item.incense.title} / ${item.incense.manufacturer.title}: ${item.count}шт на ${item.count * item.incense.pricePerStick}р\n`;
		}
	});

	text += '\n==============================\n\n';
	text += `Благовония: ${total}р, доставка: ${shippingCost}р\n`;
	text += `Итого: ${total + shippingCost}р`;

	return text;
}
