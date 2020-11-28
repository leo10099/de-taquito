import styled from "styled-components/macro";
import { gray, primary, Theme } from "theme";

export const NavTabsContainer = styled.nav`
	background-color: ${primary.primary500};
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 60px;
	// Layout Container offset
	margin-left: -8px;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
`;

export const NavTabsTabs = styled.ul`
	height: 100%;
	width: 100%;
	margin: auto;
	display: flex;
`;

export const NavTabsTab = styled.li<{ isActive: boolean }>`
	color: ${({ theme }) => (theme.name === Theme.DARK ? gray.gray010 : gray.gray400)};
	height: 100%;
	color: white;
	letter-spacing: 0.5px;
	font-weight: 600;
	text-transform: uppercase;
	opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
`;

export const NavTabsLink = styled.a<{ isActive: boolean }>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 100%;
	width: 100%;
	color: ${gray.gray010};

	> svg {
		opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
		color: ${gray.gray010};
		height: 16px;
		width: 100%;
	}
`;

export const NavTabsLabel = styled.p`
	color: ${gray.gray100};
`;
