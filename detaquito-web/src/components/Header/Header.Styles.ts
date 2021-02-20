import React from "react";
import styled, { css } from "styled-components/macro";
import { mediaQueries } from "style";

// Components
import Dropdown from "components/Dropdown";

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
	color: ${gray.gray010};
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
		pointer-events: none;
	}
`;

export const MenuItemHamburgerMobile = styled.li<{ isTranslucent: boolean }>`
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

export const HeaderAvatarContainerMobile = styled.div`
	position: relative;
	max-width: 100px;

	&:not(:first-child) {
		margin-left: 6px;
	}
`;

export const MenuDropdownMobile = styled(Dropdown)<{
	isTranslucent: boolean;
	ref: React.MutableRefObject<null>;
}>`
	background-color: ${({ isTranslucent, theme }) =>
		isTranslucent
			? "transparent"
			: theme.name === Theme.DARK
			? "rgba(154, 160, 228, 0.8);"
			: "rgba(63, 79, 231, 0.8);"};
`;

export const MenuDropdownMobileList = styled.ul``;

export const MenuDropdownMobileListItem = styled.li`
	align-items: center;
	color: ${({ theme }) => theme.elevation7};
	display: flex;
	font-size: 16px;
	font-size: 18px;
	justify-content: space-around;
	letter-spacing: 0.5px;
	padding: 1.2rem 1.8rem;

	&:active {
		background-color: ${({ theme }) => theme.elevation3};
	}

	&:first-of-type {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	&:last-of-type {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	svg {
		fill: ${({ theme }) => theme.elevation6};
		margin-left: 1rem;
	}
`;

/* Desktop version */
export const MenuDesktop = styled.ul`
	align-items: center;
	display: none;
	pointer-events: none;

	${mediaQueries.minTablet} {
		display: flex;
		pointer-events: all;
	}
`;

export const HeaderAvatarContainerDesktop = styled.div`
	position: relative;
	max-width: 200px;
`;

export const MenuDropdownDesktop = styled(Dropdown)<{
	isTranslucent: boolean;
	ref: React.MutableRefObject<null>;
}>`
	background-color: ${({ isTranslucent, theme }) =>
		isTranslucent
			? "transparent"
			: theme.name === Theme.DARK
			? "rgba(154, 160, 228, 0.8);"
			: "rgba(63, 79, 231, 0.8);"};
`;

export const MenuDropdownDesktopList = styled.ul``;

export const MenuDropdownDesktopListItem = styled.li`
	align-items: center;
	color: ${({ theme }) => theme.elevation7};
	cursor: pointer;
	display: flex;
	font-size: 16px;
	justify-content: space-around;
	letter-spacing: 0.5px;
	padding: 1.2rem 3rem;
	font-size: 18px;

	${mediaQueries.minFullHd} {
		font-size: 20px;
	}

	&:hover,
	&:active {
		background-color: ${({ theme }) => theme.elevation3};
	}

	&:first-of-type {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	&:last-of-type {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	svg {
		fill: ${({ theme }) => theme.elevation6};
		margin-left: 16px;
		max-width: 16px;
		max-height: 16px;
		vertical-align: text-top !important;
	}
`;

export const Logo = styled.img`
	height: 32px;
`;
