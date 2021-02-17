import styled from "styled-components/macro";
import { mediaQueries } from "style";

export const SideDrawerContainer = styled.nav<{ isHidden: boolean }>`
	background-color: ${({ theme }) => theme.elevation2};
	box-shadow: ${({ theme }) => theme.shadowElevation2};
	display: flex;
	height: 100vh;
	max-width: 66vw;
	position: fixed;
	right: 0;
	top: 0;
	transform: ${({ isHidden }) => (isHidden ? "translate3d(500px, 0, 0)" : "translate3d(0, 0, 0)")};
	transition: transform 600ms 100ms cubic-bezier(0.19, 1, 0.22, 1);
	width: 75%;
	z-index: 10;

	${mediaQueries.minTablet} {
		display: none;
	}

	svg {
		justify-self: flex-end;
		margin-left: auto;
		width: 20px;
		height: 20px;
		margin-top: 16px;
		margin-right: 20px;
	}
`;
