import type { CartDisplayItem } from '@/components/Cart/Cart';

export function buildCartText(list: CartDisplayItem[], totalPrice: number, deliveryPrice: number, discount: { percents: number, amount: number }): string {
	let text = 'Список благовоний:\n\n';

	list.forEach((item) => {
		if (item.incense.inStock) {
			text += `- ${item.incense.title} / ${item.incense.manufacturer.title}: ${item.count}шт на ${item.count * item.incense.pricePerStick}р\n`;
		}
	});

	text += '\n==============================\n\n';
	text += `Благовония: ${totalPrice}р\n`;
	text += `Доставка: ${deliveryPrice > 0 ? `${deliveryPrice}р` : 'бесплатно'}\n`;
	if (discount.amount > 0)
		text += `Скидка: -${discount.amount}р (${discount.percents}%)\n`;
	text += `Итого: ${totalPrice - discount.amount + deliveryPrice}р`;

	return text;
}
