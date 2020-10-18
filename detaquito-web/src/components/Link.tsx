import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import styled from "styled-components/macro";

const StyledReactRouterLink = styled(ReactRouterLink)``;
const StyledNativeLink = styled.a``;

interface LinkProps {
	children: string | React.ReactNode;
	target?: "_blank" | "_self";
	to: string;
}

const Link: React.FC<LinkProps> = ({ children, target = "_self", to }: LinkProps) => {
	if (target === "_blank") {
		return (
			<StyledNativeLink href={to} rel="noopener noreferer">
				{children}
			</StyledNativeLink>
		);
	}

	return <StyledReactRouterLink to={to}>{children}</StyledReactRouterLink>;
};

export default Link;
