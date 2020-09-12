import React from "react";
import FadeInFadeOutProvider from "./FadeInFadeOutProvider";
import { Route } from "react-router-dom";

interface RouteTransitionProps {
	path: string;
	component: React.LazyExoticComponent<React.FC<any>>;
}

const RouteTransition: React.FC<RouteTransitionProps> = ({ path, component: Component }) => {
	return (
		<FadeInFadeOutProvider>
			<Route path={path} element={<Component />} />
		</FadeInFadeOutProvider>
	);
};

export default RouteTransition;
