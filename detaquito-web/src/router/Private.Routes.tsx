import React, { lazy } from "react";
import { Route } from "react-router-dom";

// Providers
import AuthGuard from "features/Auth/AuthGuard";

// Public Routes
const Dashboard = lazy(() => import("features/Dashboard"));

const privateRoutes = [{ component: Dashboard, path: "*/app/dashboard", name: "Dashboard" }];

const Private: React.FC = () => (
	<AuthGuard>
		{privateRoutes.map(({ component: Component, path, name }) => {
			return <Route element={<Component />} path={path} key={name} />;
		})}
	</AuthGuard>
);

export default React.memo(Private);
