import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Public Routes
const Home = lazy(() => import("features/Home"));
const NotFound = lazy(() => import("features/NotFound"));

export const Public = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
};
