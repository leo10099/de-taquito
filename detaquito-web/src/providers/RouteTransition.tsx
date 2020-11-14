import React from "react";
import FadeInFadeOutProvider from "./FadeInFadeOutProvider";
import { Route } from "react-router-dom";

interface RouteTransitionProps {
	path: string;
	component: React.LazyExoticComponent<React.FC<any>>;
}

const RouteTransition: React.FC<RouteTransitionProps> = ({ path, component: Component }) => {
	return (
		<main id="Main">
			<FadeInFadeOutProvider>
				<Route path={path} element={<Component />} />
			</FadeInFadeOutProvider>
		</main>
	);
};

export default RouteTransition;
