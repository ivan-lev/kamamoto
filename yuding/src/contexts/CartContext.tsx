import type { CartItem } from '@/hooks/useCart';
import { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';

interface CartContextType {
	items: CartItem[];
	addItem: (manufacturer: string, incense: string, count: number) => void;
	removeItem: (manufacturer: string, incense: string) => void;
	clearCart: () => void;
	getItemCount: (manufacturer: string, incense: string) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const cart = useCart();

	return (
		<CartContext.Provider value={ cart }>
			{ children }
		</CartContext.Provider>
	);
}

export function useCartContext() {
	const ctx = useContext(CartContext);
	if (!ctx)
		throw new Error('useCartContext must be used inside CartProvider');
	return ctx;
}
