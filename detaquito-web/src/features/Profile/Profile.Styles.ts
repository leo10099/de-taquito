import styled from "styled-components/macro";
import { mediaQueries } from "style";

// Utils
import { FlexColumnCentered } from "utils/styles";

export const ProfileContainer = styled.section`
	${FlexColumnCentered()};
	margin: 120px auto;

	${mediaQueries.minTablet} {
		margin: 140px auto;
	}

	${mediaQueries.minFullHd} {
		margin: 160px auto;
	}
`;
