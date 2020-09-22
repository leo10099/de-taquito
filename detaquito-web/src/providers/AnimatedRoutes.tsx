import React, { FC, LazyExoticComponent } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, useLocation } from "react-router-dom";

// Providers
import { RouteTransition } from "providers";

interface RoutesProps {
	exitBeforeEnter?: boolean;
	initial?: boolean;
	routes: Array<{
		component: LazyExoticComponent<React.FC<any>>;
		path: string;
		name: string;
	}>;
}

const AnimatedRoutes: FC<RoutesProps> = ({ exitBeforeEnter = true, initial = false, routes }) => {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
			<Routes key={location.pathname}>
				{routes.map(({ component, path, name }) => (
					<RouteTransition path={path} key={name} component={component} />
				))}
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
