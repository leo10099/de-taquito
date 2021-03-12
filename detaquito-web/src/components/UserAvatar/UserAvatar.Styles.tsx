import styled, { css } from "styled-components/macro";
import { mediaQueries } from "style";

// Theme
import { gray, error } from "theme";

export const UserAvatarContainer = styled.div<{ isPreview?: boolean; margin?: string }>`
	cursor: pointer;
	display: flex;
	padding: 10px;
	position: relative;

	${({ margin }) =>
		margin &&
		css`
			margin: ${margin};
		`};
	${({ isPreview }) =>
		isPreview &&
		css`
			pointer-events: none;
			padding: 0;
		`}

	img {
		background-color: ${gray.gray010};
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: contain;

		${mediaQueries.minNotebook} {
			width: 40px;
			height: 40px;
		}

		${mediaQueries.minFullHd} {
			background-color: ${gray.gray010};
			height: 44px;
			width: 44px;
		}
	}

	svg {
		width: 32px;
		height: 32px;

		${mediaQueries.minNotebook} {
			width: 40px;
			height: 40px;
		}

		${mediaQueries.minFullHd} {
			height: 44px;
			width: 44px;
		}
	}
`;
