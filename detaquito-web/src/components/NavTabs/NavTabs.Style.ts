import styled, { css } from "styled-components/macro";
import { gray, primary, Theme } from "theme";
import { mediaQueries } from "style";

export const NavTabsContainer = styled.nav<{ shouldShowNavTabs: boolean }>`
	// Layout Container offset
	background-color: rgba(63, 79, 231, 0.8);
	bottom: 0;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	height: 64px;
	margin-left: -8px;
	position: fixed;
	transition: transform 400ms ease-in;
	width: 100vw;
	${({ shouldShowNavTabs }) =>
		shouldShowNavTabs
			? css`
					transform: translate3d(0, 0, 0);
			  `
			: css`
					transform: translate3d(0, 110%, 0);
			  `}

	${mediaQueries.minTablet} {
		display: none;
	}
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
`;

export const NavTabsLink = styled.a<{ isActive: boolean }>`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 100%;
	width: 100%;
	color: ${gray.gray010};
	${({ theme, isActive }) =>
		isActive &&
		css`
			background-color: ${theme.primaryMain};
		`};

	> svg {
		opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
		color: ${gray.gray010};
		height: 16px;
		width: 100%;
	}
`;

export const NavTabsLabel = styled.p<{ isActive: boolean }>`
	color: ${gray.gray100};
	opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
`;
