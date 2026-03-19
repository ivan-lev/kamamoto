import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import YuDing from '@/components/App/App';
import { CartProvider } from '@/contexts/CartContext';

import '@/styles/_index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<CartProvider>
			<BrowserRouter basename="/yuding">
				<YuDing />
			</BrowserRouter>
		</CartProvider>
	</React.StrictMode>,
);
