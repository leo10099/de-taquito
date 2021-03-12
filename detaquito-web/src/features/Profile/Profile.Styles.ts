import styled from "styled-components/macro";
import { mediaQueries } from "style";
import { Theme, gray } from "theme";

// Components
import { ErrorMessage } from "components/UI/TextInput";

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

export const ProfileAvatar = styled.div`
	position: relative;

	img {
		object-fit: contain;
		border-radius: 50%;
		border: 3px solid ${({ theme }) => theme.primaryLight};
		cursor: pointer;
		height: 80px;
		margin: 2rem auto 4rem auto;
		width: 80px;
		background-color: transparent;
	}

	svg {
		position: absolute;
		cursor: pointer;
		fill: ${({ theme }) => theme.primaryLight};
		position: absolute;
		left: calc(50% + 24px);
		top: calc(50% + 36px);
		transform: translate(-50%, -50%);
		z-index: 1000;
	}
`;

export const ProfileAvatarIcon = styled.div`
	background-color: ${({ theme }) => (theme.name === Theme.LIGHT ? gray.gray200 : gray.gray100)};
	border-radius: 50%;
	cursor: pointer;
	height: 28px;
	left: calc(50% + 24px);
	opacity: 0.9;
	position: absolute;
	top: calc(50% + 36px);
	transform: translate(-50%, -50%);
	width: 28px;
	z-index: 10;
`;

export const FileUploadError = styled(ErrorMessage)`
	position: relative;
	text-align: center;
`;
