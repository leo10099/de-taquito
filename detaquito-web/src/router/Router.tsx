import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Public } from 'router/Public.Routes';

export const Router: React.FC = () => (
	<BrowserRouter>
		<Public />
	</BrowserRouter>
);
