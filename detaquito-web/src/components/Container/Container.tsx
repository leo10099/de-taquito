import React from "react";

// Styled
import { Container as StyledContainer } from "./Container.styles";

interface ContainerProps {
	name?: string;
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, name }) => {
	if (name) {
		return <StyledContainer id={`${name}`}>{children}</StyledContainer>;
	}

	return <StyledContainer as="div">{children}</StyledContainer>;
};

export default React.memo(Container);
