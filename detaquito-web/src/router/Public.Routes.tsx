import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// Providers
import { AnimatedRoutes } from "providers";

// Public Routes
const Home = lazy(() => import("features/Home"));
const NotFound = lazy(() => import("features/NotFound"));
const SignUp = lazy(() => import("features/Auth/SignUp"));
const LogIn = lazy(() => import("features/Auth/LogIn"));
const ForgotPassword = lazy(() => import("features/Auth/ForgotPassword"));

// Private Routes
const Private = lazy(() => import("./Private.Routes"));

const routes = [
	{ component: Home, path: "/", name: "Home" },
	{ component: LogIn, path: "/auth/login", name: "LogIn" },
	{ component: SignUp, path: "/auth/signup", name: "SignUp" },
	{ component: ForgotPassword, path: "/auth/forgot", name: "ForgotPassword" },
	{ component: Private, path: "app/*", name: "PrivateRoutes" },
	{ component: NotFound, path: "*", name: "NotFound" },
];

const Public = () => {
	return (
		<Suspense fallback={false}>
			<AnimatedRoutes exitBeforeEnter routes={routes} />
			<Outlet />
		</Suspense>
	);
};

export default React.memo(Public);
