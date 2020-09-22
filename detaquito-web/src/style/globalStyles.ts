import { css, createGlobalStyle } from "style";
import { primary, ThemeType } from "theme";
import { style } from "utils";

const { generateResponsiveText } = style;

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
	mobile: { breakpoint: 0, baseFontSize: 1.25 },
	tablet: { breakpoint: 500, baseFontSize: 1.4 },
	notebook: { breakpoint: 900, baseFontSize: 1.5 },
	desktop: { breakpoint: 1300, baseFontSize: 1.75 },
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
				color: ${() => primary.primary400};

				&:visited {
					color: ${() => primary.primary400};
				}

				&:hover {
					color: ${() => primary.primary200};
				}
			}
		}
	`
);

export default globalStyles;
