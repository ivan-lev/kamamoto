import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App/App.tsx';
import store from '@/slices/visitor/index';
import '@/styles/_index.scss';

import '@fontsource/raleway/100.css';
import '@fontsource/raleway/200.css';
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={ store }>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
