export function countDiscount(price: number): { percents: number, amount: number } {
	let discount = 0;
	if (price < 3500) {
		discount = 0;
	}
	else if (price < 4500) {
		discount = 5;
	}
	else if (price < 5500) {
		discount = 10;
	}
	return { percents: discount, amount: Math.round(price / 100 * discount) };
}
