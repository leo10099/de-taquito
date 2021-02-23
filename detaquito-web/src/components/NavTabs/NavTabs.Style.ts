import styled, { css } from "styled-components/macro";
import { gray, primary, Theme } from "theme";
import { mediaQueries } from "style";

export const NavTabsContainer = styled.nav<{ shouldShowNavTabs: boolean }>`
	// Layout Container offset
	background-color: ${({ theme }) =>
		theme.name === Theme.DARK ? "rgba(154, 160, 228, 1);" : "rgba(63, 79, 231, 0.9);"};
	bottom: 0;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	height: 64px;
	left: 0;
	position: fixed;
	transition: transform 400ms ease-in;
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
	color: ${({ theme }) => (theme.name === Theme.DARK ? primary.primary200 : gray.gray400)};
	font-weight: 600;
	height: 100%;
	letter-spacing: 0.5px;
	text-transform: uppercase;
`;

export const NavTabsLink = styled.a<{ isActive: boolean }>`
	align-items: center;
	color: ${gray.gray010};
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-evenly;
	width: 100%;
	${({ theme, isActive }) =>
		isActive &&
		css`
			background-color: ${theme.name === Theme.DARK ? primary.primary300 : primary.primary500};
		`};

	> svg {
		opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
		color: ${({ theme }) => (theme.name === Theme.DARK ? gray.gray800 : gray.gray100)};
		height: 16px;
		width: 100%;
	}
`;

export const NavTabsLabel = styled.p<{ isActive: boolean }>`
	color: ${({ theme }) => (theme.name === Theme.DARK ? gray.gray800 : gray.gray100)};
	opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
`;
