import { css, createGlobalStyle } from "style";
import { primary, ThemeType, breakpoints } from "theme";
import { generateResponsiveText } from "utils/styles";

interface Props {
	theme: ThemeType;
}
export type ResponsiveConfigOptions = {
	mobile: {
		breakpoint: number;
		baseFontSize: number;
	};
	tablet: {
		breakpoint: number;
		baseFontSize: number;
	};
	notebook: {
		breakpoint: number;
		baseFontSize: number;
	};
	desktop: {
		breakpoint: number;
		baseFontSize: number;
	};
};

const globalStyles = createGlobalStyle(
	(props: Props) => css`
		html {
			font-size: 62.5%;
		}

		body {
			background-color: ${() => props.theme.background};
			color: ${() => props.theme.elevation8};
			font-family: "Open Sans", sans-serif;
			padding: 0;

			${generateResponsiveText(breakpoints)};

			a {
				text-decoration: none;
				color: ${primary.primary400};

				&:visited {
					color: ${primary.primary400};
				}

				&:hover {
					color: ${primary.primary200};
				}
			}

		// Utility classes
		.pointer {
			cursor: pointer;
		}
		.fixed {
			position: fixed;
		}
	`
);

export const mediaQueries = {
	minTablet: `@media screen and (min-width: ${breakpoints.tablet.breakpoint}px)`,
	minNotebook: `@media screen and (min-width: ${breakpoints.notebook.breakpoint}px)`,
	minDesktop: `@media screen and (min-width: ${breakpoints.desktop.breakpoint}px)`,
	minFullHd: `@media screen and (min-width: ${breakpoints.fullHd.breakpoint}px)`,
};

export default globalStyles;
