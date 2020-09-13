import { CSSProperties } from "react";
import type { ResponsiveConfigOptions } from "style/globalStyles";

// Helper Functions

export function rgba(hex: string, alpha = 1) {
	const r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}

export function generateResponsiveText(options: ResponsiveConfigOptions) {
	let resultingMediaQuery = "";
	Object.entries(options).forEach(([_breakpoint, { breakpoint, baseFontSize }]) => {
		resultingMediaQuery += `@media only screen and (min-width: ${breakpoint}px) {
			line-height: ${baseFontSize * 1.5}rem;
			font-size: ${baseFontSize}rem;
		}`;
	});

	return resultingMediaQuery;
}

// CSS Style Objects

export const centeredText: CSSProperties = {
	textAlign: "center",
};

export const centeredOnFullHeight: CSSProperties = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};

// Styled-Components CSS Mixins

// export const CenterAbsolutely = () => css`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// export const FlexRow = () => css`
//   display: flex;
// `;

// export const FlexColumn = () => css`
//   display: flex;
//   flex-direction: column;
// `;

// export const FlexColumnCentered = () => css`
//   ${FlexColumn};
//   align-items: center;
//   justify-content: center;
// `;

// export const FlexRowCentered = () => css`
//   ${FlexRow};
//   align-items: center;
//   justify-content: center;
// `;
