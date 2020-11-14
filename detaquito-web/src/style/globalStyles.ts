import { css, createGlobalStyle } from "style";
import { primary, ThemeType } from "theme";
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

export const responsiveOptions = {
	mobile: { breakpoint: 0, baseFontSize: 1.3 },
	tablet: { breakpoint: 560, baseFontSize: 1.5 },
	notebook: { breakpoint: 1200, baseFontSize: 1.75 },
	desktop: { breakpoint: 1440, baseFontSize: 2 },
	fullHd: { breakpoint: 1920, baseFontSize: 2.5 },
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

			${generateResponsiveText(responsiveOptions)};

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

export default globalStyles;
