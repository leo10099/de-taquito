import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Routes
import Home from "features/Home";
import NotFound from "features/NotFound";

export const Public = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
