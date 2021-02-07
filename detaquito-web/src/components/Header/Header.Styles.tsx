import styled, { css } from "styled-components/macro";
import { mediaQueries } from "style";

// Theme
import { gray, Theme } from "theme";

interface HeaderProps {
	isTranslucent?: boolean;
	shouldShowHeader: boolean;
}

export const Header = styled.header<HeaderProps>`
	align-items: center;
	background-color: ${({ isTranslucent, theme }) =>
		isTranslucent
			? "transparent"
			: theme.name === Theme.DARK
			? "rgba(154, 160, 228, 0.8);"
			: "rgba(63, 79, 231, 0.8);"};
	display: flex;
	justify-content: space-between;
	left: 0;
	padding-top: 10px;
	padding: 0 8px;
	position: fixed;
	width: 100vw;
	height: 80px;
	transition: transform 400ms ease-in;
	${({ shouldShowHeader }) =>
		shouldShowHeader
			? css`
					transform: translate3d(0, 0, 0);
			  `
			: css`
					transform: translate3d(0, -110%, 0);
			  `}
`;

/* Mobile version*/
export const MenuMobile = styled.ul`
	align-items: center;
	display: flex;

	${mediaQueries.minTablet} {
		display: none;
	}
`;

export const MenuItemMobile = styled.li<{ isTranslucent: boolean }>`
	color: ${({ theme, isTranslucent }) =>
		isTranslucent ? (theme.name === Theme.DARK ? gray.gray100 : gray.gray600) : gray.gray010};
	cursor: pointer;
	height: 44px;
	width: 44px;
	padding: 12px;

	svg {
		width: 100%;
		height: 100%;
		fill: ${({ theme, isTranslucent }) =>
			isTranslucent ? (theme.name === Theme.DARK ? gray.gray010 : gray.gray600) : gray.gray010};
	}
`;

/* Desktop version */
export const MenuDesktop = styled.ul`
	align-items: center;
	display: none;

	${mediaQueries.minTablet} {
		display: flex;
	}
`;

export const MenuItemDesktop = styled.li<{ isTranslucent: boolean }>`
	padding-right: 10px;
`;

export const Logo = styled.img`
	height: 32px;
`;
