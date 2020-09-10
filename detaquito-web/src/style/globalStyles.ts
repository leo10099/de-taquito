import { css, createGlobalStyle } from "style";
import { primary, ThemeType } from "theme";

interface Props {
	theme: ThemeType;
}

const basefontSize = 1.5; // 15px

export default createGlobalStyle(
	(props: Props) => css`
		html {
			font-size: 62.5%;
		}

		body {
			background-color: ${() => props.theme.background};
			color: ${() => props.theme.elevation8};
			font-family: "Open Sans", sans-serif;
			font-size: ${basefontSize}rem;
			letter-spacing: 0.08rem;
			line-height: ${basefontSize * 1.5}rem;
			padding: 0;

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
