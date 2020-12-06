import styled from "styled-components/macro";
import { gray } from "theme";

export const SideDrawerContainer = styled.nav<{ isHidden: boolean }>`
	/* background-color: ${gray.gray100}; */
	display: flex;
	height: 100vh;
	max-width: 66vw;
	position: absolute;
	right: 0;
	top: 0;
	transform: ${({ isHidden }) => (isHidden ? "translate3d(500px, 0, 0)" : "translate3d(0, 0, 0)")};
	transition: transform 400ms 100ms cubic-bezier(0.19, 1, 0.22, 1);
	width: 75%;

	svg {
		justify-self: flex-end;
		margin-left: auto;
		width: 20px;
		height: 20px;
		margin-top: 16px;
		margin-right: 20px;
	}
`;
