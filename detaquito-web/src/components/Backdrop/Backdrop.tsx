import React from "react";

// Styles
import styled from "styled-components/macro";

interface BackdropProps {
	isActive: boolean;
	children: React.ReactElement;
	maxVw?: number;
}

const BackdropContainer = styled.div<{ maxVw?: number }>`
	background-color: black;
	height: 100vh;
	left: 0;
	opacity: 0.5;
	position: fixed;
	top: 0;
	width: ${({ maxVw }) => (maxVw ? maxVw + "vw" : "100vw")};
`;

const Backdrop: React.FC<BackdropProps> = ({ children, isActive, maxVw }: BackdropProps) => {
	if (!isActive) return children;

	return <BackdropContainer maxVw={maxVw}>{children}</BackdropContainer>;
};

export default React.memo(Backdrop);
