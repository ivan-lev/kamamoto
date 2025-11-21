import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App/App.tsx';

import '@/styles/_index.scss';
import '@fontsource/raleway/latin-200.css';
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/cyrillic-100.css';
import '@fontsource/raleway/cyrillic-200.css';
import '@fontsource/raleway/cyrillic-300.css';
import '@fontsource/raleway/cyrillic-400.css';
import '@fontsource/raleway/cyrillic-400-italic.css';

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		fetchpriority?: 'high' | 'low' | 'auto';
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
