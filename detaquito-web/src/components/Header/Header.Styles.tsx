import styled, { css } from "styled-components/macro";

// Theme
import { gray } from "theme";

interface HeaderProps {
	isTranslucent?: boolean;
	shouldShowHeader: boolean;
}

export const Header = styled.header<HeaderProps>`
	align-items: center;
	background-color: ${({ isTranslucent }) => (isTranslucent ? "transparent" : gray.gray050)};
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
	height: 74px;
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

export const MenuItem = styled.li`
	cursor: pointer;
	height: 48px;
	width: 48px;
	padding: 12px;

	svg {
		width: 100%;
		height: 100%;
		fill: ${({ theme }) => theme.color};
	}
`;

export const Logo = styled.img`
	height: 48px;
`;
