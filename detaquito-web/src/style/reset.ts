import { createGlobalStyle, css } from "style";

const ResetStyles = createGlobalStyle(
	() => css`
		/* Box sizing rules */
		*,
		*::before,
		*::after {
			box-sizing: border-box;
		}

		/* Remove default padding */
		ul[class],
		ol[class] {
			padding: 0;
		}

		/* Remove default margin */
		body,
		h1,
		h2,
		h3,
		h4,
		p,
		ul[class],
		ol[class],
		li,
		figure,
		figcaption,
		blockquote,
		dl,
		dd {
			margin: 0;
		}

		/* Set core body defaults */
		body {
			height: 100%;
			scroll-behavior: smooth;
			line-height: 1.5;
		}

		/* Remove list styles on ul, */
		ul,
		li {
			padding: 0;
			margin: 0;
			list-style: none;
		}

		/* A elements that don't have a class get default styles */
		a:not([class]) {
			text-decoration-skip-ink: auto;
		}

		/* Make images easier to work with */
		img {
			max-width: 100%;
			display: block;
		}

		/* Natural flow and rhythm in articles by default */
		article > * + * {
			margin-top: 1em;
		}

		/* Inherit fonts for inputs and buttons */
		input,
		button,
		textarea,
		select {
			font: inherit;
		}
	`
);

export default ResetStyles;
