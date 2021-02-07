import { rgba } from "utils/styles";

// Base Colors
const violet = "#4458f3";
const yellow = "#ffc30f";
const green = "#63b449";
const red = "#ef5743";

// Color shades
export const primary = {
	primary050: "#ebecfe",
	primary100: "#bac1fc",
	primary200: "#a7b0fb",
	primary300: "#818ffa",
	primary400: "#6374f7",
	primary500: violet,
	primary600: "#3f4fe7",
	primary700: "#3444da",
	primary800: "#2b38cf",
	primary900: "#181fbd",
};

const secondary = {
	secondary050: "#fff8e1",
	secondary100: "#ffedb4",
	secondary200: "#ffe183",
	secondary300: "#ffd751",
	secondary400: "#ffcc2b",
	secondary500: yellow,
	secondary600: "#ffb507",
	secondary700: "#ffa205",
	secondary800: "#ff9104",
	secondary900: "#ff7202",
};

const success = {
	success050: "#eaf6e8",
	success100: "#cee7c8",
	success200: "#afd9a5",
	success300: "#90cb80",
	success400: "#79bf65",
	success500: green,
	success600: "#5aa540",
	success700: "#4d9336",
	success800: "#4d9336",
	success900: "#2d631b",
};

const error = {
	error050: "#feecef",
	error100: "#fcd1d4",
	error200: "#eba19f",
	error300: "#e07d7b",
	error400: "#ea625a",
	error500: red,
	error600: "#e04e41",
	error700: "#ce453b",
	error800: "#c03f34",
	error900: "#b0372a",
};

export const gray = {
	gray010: "#FEFEFE",
	gray050: "#FDFDFD",
	gray100: "#F6F6F6",
	gray200: "#E0E0E0",
	gray300: "#BDBDBD",
	gray400: "#9A9EB2",
	gray500: "#757575",
	gray600: "#404040",
	gray700: "#353535",
	gray800: "#303030",
	gray900: "#1E1E1E",
	gray950: "#121212",
};

// Shadows
const opacity = { umbra: 0.2, penumbra: 0.14, ambient: 0.12 };

export const shadow = {
	regular005: `0 2px 2px 0 rgba(0, 0, 0, ${opacity.penumbra}),
	0 3px 1px -2px rgba(0, 0, 0, ${opacity.umbra}),
	0 1px 5px 0 rgba(0, 0, 0, ${opacity.ambient});`,
	error005: `0 2px 2px 0 ${rgba(error.error500, opacity.penumbra)},
		0 3px 1px -2px ${rgba(error.error500, opacity.umbra)},
		0 1px 5px 0 ${rgba(error.error500, opacity.ambient)};`,

	regular010: `0 3px 4px 0 rgba(0, 0, 0, ${opacity.penumbra}),
	0 3px 3px -2px rgba(0, 0, 0, ${opacity.umbra}),
	0 1px 8px 0 rgba(0, 0, 0, ${opacity.ambient});`,
	error010: `0 3px 4px 0 ${rgba(error.error500, opacity.penumbra)},
	0 3px 3px -2px ${rgba(error.error500, opacity.umbra)},
	0 1px 8px 0 ${rgba(error.error500, opacity.ambient)};`,

	regular020: `0 4px 5px 0 rgba(0, 0, 0, ${opacity.penumbra}),
	0 1px 10px 0 rgba(0, 0, 0, ${opacity.umbra}),
	0 2px 4px -1px rgba(0, 0, 0,${opacity.ambient});`,
	error020: `0 4px 5px ${rgba(error.error500, opacity.penumbra)},
		0 1px 10px 0 ${rgba(error.error500, opacity.umbra)},
		0 2px 4px -1px ${rgba(error.error500, opacity.ambient)};`,

	regular030: `0 6px 10px 0 rgba(0, 0, 0, ${opacity.penumbra}),
	0 1px 18px 0 rgba(0, 0, 0, ${opacity.umbra}),
	0 3px 5px -1px rgba(0, 0, 0, ${opacity.ambient});
	`,
	error030: `0 6px 10px 0 ${rgba(error.error500, opacity.penumbra)},
	0 1px 18px 0 ${rgba(error.error500, opacity.umbra)},
	0 3px 5px -1px ${rgba(error.error500, opacity.ambient)},
	`,

	regular040: `0 8px 10px 1px rgba(0, 0, 0, ${opacity.penumbra}),
	0 3px 14px 2px rgba(0, 0, 0, ${opacity.umbra}),
	0 5px 5px -3px rgba(0, 0, 0, ${opacity.ambient});`,
	error040: `0 8px 10px 1px ${rgba(error.error500, opacity.penumbra)},
	0 3px 14px 2px ${rgba(error.error500, opacity.umbra)},
	0 5px 5px -3px ${rgba(error.error500, opacity.ambient)};`,

	regular050: `0 16px 24px 2px rgba(0, 0, 0, ${opacity.penumbra}),
	0  6px 30px 5px rgba(0, 0, 0, ${opacity.umbra}),
	0  8px 10px -5px rgba(0, 0, 0, ${opacity.ambient});`,
	error050: `0 16px 24px 2px ${rgba(error.error500, opacity.penumbra)},
	0  6px 30px 5px ${rgba(error.error500, opacity.umbra)},
	0  8px 10px -5px ${rgba(error.error500, opacity.ambient)};`,

	regular060: `0  9px 46px  8px rgba(0, 0, 0, ${opacity.penumbra}),
	0 11px 15px -7px rgba(0, 0, 0, ${opacity.umbra}),
	0 24px 38px  3px rgba(0, 0, 0, ${opacity.ambient});`,
	error060: `0  9px 46px  8px ${rgba(error.error500, opacity.penumbra)},
	0 11px 15px -7px ${rgba(error.error500, opacity.umbra)},
	0 24px 38px  3px ${rgba(error.error500, opacity.ambient)};`,
};

// Breakpoints
export const breakpoints = {
	mobile: { breakpoint: 0, baseFontSize: 1.2 },
	tablet: { breakpoint: 560, baseFontSize: 1.4 },
	notebook: { breakpoint: 1200, baseFontSize: 1.75 },
	desktop: { breakpoint: 1440, baseFontSize: 2 },
	fullHd: { breakpoint: 1920, baseFontSize: 2.25 },
};

// Themes
export const dark = {
	name: "dark",
	error: error.error300,
	success: success.success300,
	primaryLight: primary.primary200,
	primaryMain: primary.primary400,
	primaryDark: primary.primary700,
	secondaryLight: secondary.secondary050,
	secondaryMain: secondary.secondary300,
	secondaryDark: secondary.secondary500,
	color: gray.gray300,
	elevation0: gray.gray950,
	elevation1: gray.gray900,
	elevation2: gray.gray800,
	elevation3: gray.gray700,
	elevation4: gray.gray600,
	elevation5: gray.gray500,
	elevation6: gray.gray400,
	elevation7: gray.gray300,
	elevation8: gray.gray200,
	elevation9: gray.gray100,
	background: gray.gray950,
	shadowElevation1: shadow.regular005,
	shadowElevation2: shadow.regular010,
	shadowElevation3: shadow.regular020,
	shadowElevation4: shadow.regular030,
	shadowElevation5: shadow.regular040,
	shadowElevation6: shadow.regular050,
	shadowElevation7: shadow.regular060,
	errorShadowElevation1: shadow.error005,
	errorShadowElevation2: shadow.error010,
	errorShadowElevation3: shadow.error020,
	errorShadowElevation4: shadow.error030,
	errorShadowElevation5: shadow.error040,
	errorShadowElevation6: shadow.error050,
	errorShadowElevation7: shadow.error060,
};

export const light = {
	name: "light",
	error: error.error500,
	success: success.success500,
	primaryLight: primary.primary300,
	primaryMain: primary.primary500,
	primaryDark: primary.primary800,
	secondaryLight: secondary.secondary300,
	secondaryMain: secondary.secondary500,
	secondaryDark: secondary.secondary800,
	color: gray.gray700,
	elevation0: gray.gray010,
	elevation1: gray.gray050,
	elevation2: gray.gray100,
	elevation3: gray.gray200,
	elevation4: gray.gray300,
	elevation5: gray.gray400,
	elevation6: gray.gray500,
	elevation7: gray.gray600,
	elevation8: gray.gray700,
	elevation9: gray.gray800,
	background: gray.gray050,
	shadowElevation1: shadow.regular005,
	shadowElevation2: shadow.regular010,
	shadowElevation3: shadow.regular020,
	shadowElevation4: shadow.regular030,
	shadowElevation5: shadow.regular040,
	shadowElevation6: shadow.regular050,
	shadowElevation7: shadow.regular060,
	errorShadowElevation1: shadow.error005,
	errorShadowElevation2: shadow.error010,
	errorShadowElevation3: shadow.error020,
	errorShadowElevation4: shadow.error030,
	errorShadowElevation5: shadow.error040,
	errorShadowElevation6: shadow.error050,
	errorShadowElevation7: shadow.error060,
};

export enum Theme {
	DARK = "dark",
	LIGHT = "light",
}

export type ThemeType = typeof light & typeof dark;
