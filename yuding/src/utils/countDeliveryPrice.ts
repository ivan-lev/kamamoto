export function countDeliveryPrice(price: number) {
	if (price <= 2000) {
		return 350;
	}
	else if (price <= 2500) {
		return 300;
	}
	else if (price <= 3000) {
		return 250;
	}
	else if (price <= 3500) {
		return 200;
	}
	else if (price <= 4000) {
		return 100;
	}
	else { return 0; };
}
