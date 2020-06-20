import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { NotFound } from 'components/NotFound';
import { AuthGuard } from 'features/Auth/AuthGuard';
import { Dashboard } from 'features/Dashboard/Dashboard';

export const Private = () => {
	return (
		<Routes>
			<AuthGuard>
				<Route path="/dashboard" element={<Dashboard />} />
			</AuthGuard>
			<Route path="*/*" element={<NotFound />} />
		</Routes>
	);
};
