import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import YuDing from '@/components/App/App';

import '@/styles/_index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename="/yuding">
			<YuDing />
		</BrowserRouter>
	</React.StrictMode>,
);
