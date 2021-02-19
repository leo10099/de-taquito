import React, { lazy } from "react";
import { Route } from "react-router-dom";

// Providers
import AuthGuard from "features/Auth/AuthGuard";

// Providers
import { AnimatedRoutes } from "providers";

// Public Routes
const Profile = lazy(() => import("features/Profile"));
const Dashboard = lazy(() => import("features/Dashboard"));

const privateRoutes = [
	{ component: Profile, path: "/profile", name: "Profile" },
	{ component: Dashboard, path: "*", name: "Dashboard" },
];

const Private: React.FC = () => (
	<AuthGuard>
		<AnimatedRoutes exitBeforeEnter routes={privateRoutes} />
	</AuthGuard>
);

export default React.memo(Private);
