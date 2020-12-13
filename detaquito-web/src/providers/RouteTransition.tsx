import React from "react";
import FadeInFadeOutProvider from "./FadeInFadeOutProvider";
import styled from "styled-components/macro";
import { Route } from "react-router-dom";
interface RouteTransitionProps {
	path: string;
	component: React.LazyExoticComponent<React.FC<any>>;
}

const Main = styled.main`
	margin-top: 80px;
`;

const RouteTransition: React.FC<RouteTransitionProps> = ({ path, component: Component }) => {
	return (
		<Main id="Main">
			<FadeInFadeOutProvider>
				<Route path={path} element={<Component />} />
			</FadeInFadeOutProvider>
		</Main>
	);
};

export default RouteTransition;
