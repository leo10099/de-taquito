import styled from "styled-components/macro";
import { mediaQueries } from "style";

// Theme
import { gray } from "theme";

export const UserAvatarContainer = styled.div`
	cursor: pointer;
	padding: 10px;

	img {
		width: 24px;
		height: 24px;
		border-radius: 50%;

		${mediaQueries.minNotebook} {
			background-color: ${gray.gray100};
			height: 32px;
			width: 32px;
		}

		${mediaQueries.minTablet} {
			height: 44px;
			width: 44px;
		}
	}
`;
