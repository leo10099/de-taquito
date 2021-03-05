import styled from "styled-components/macro";
import { mediaQueries } from "style";

// Theme
import { gray } from "theme";

export const UserAvatarContainer = styled.div`
	cursor: pointer;
	display: flex;
	padding: 10px;

	img {
		width: 24px;
		height: 24px;
		border-radius: 50%;

		${mediaQueries.minNotebook} {
			background-color: ${gray.gray010};
			height: 32px;
			width: 32px;
		}

		${mediaQueries.minFullHd} {
			background-color: ${gray.gray010};
			height: 38px;
			width: 38px;
		}
	}

	svg {
		width: 24px;
		height: 24px;

		${mediaQueries.minNotebook} {
			height: 32px;
			width: 32px;
		}

		${mediaQueries.minFullHd} {
			height: 40px;
			width: 40px;
		}
	}
`;
