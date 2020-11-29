import styled, { css } from "styled-components/macro";

// Theme
import { gray, primary, Theme } from "theme";

interface HeaderProps {
	isTranslucent?: boolean;
	shouldShowHeader: boolean;
}

export const Header = styled.header<HeaderProps>`
	align-items: center;
	background-color: ${({ isTranslucent }) => (isTranslucent ? "transparent" : primary.primary600)};
	${({ isTranslucent, theme }) =>
		!isTranslucent &&
		css`
			box-shadow: ${theme.shadowElevation1};
		`};
	display: flex;
	justify-content: space-between;
	left: 0;
	padding-top: 10px;
	padding: 0 8px;
	position: fixed;
	width: 100vw;
	height: 54px;
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

export const Menu = styled.ul`
	align-items: center;
	display: flex;
`;

export const MenuItem = styled.li<{ isTranslucent: boolean }>`
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

export const Logo = styled.img`
	height: 32px;
`;