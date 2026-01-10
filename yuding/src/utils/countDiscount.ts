export function countDiscount(price: number): { percents: number, amount: number } {
	let discount = 0;
	if (price < 3500) {
		discount = 0;
	}
	else if (price < 3750) {
		discount = 1;
	}
	else if (price < 4000) {
		discount = 2;
	}
	else if (price < 4250) {
		discount = 3;
	}
	else if (price < 4500) {
		discount = 4;
	}
	else if (price < 4750) {
		discount = 5;
	}
	else if (price < 5000) {
		discount = 6;
	}
	else if (price < 5250) {
		discount = 7;
	}
	else if (price < 5500) {
		discount = 8;
	}
	else if (price < 5750) {
		discount = 9;
	}
	else {
		discount = 10;
	}

	return { percents: discount, amount: Math.round(price / 100 * discount) };
}
