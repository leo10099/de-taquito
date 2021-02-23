import styled from "styled-components/macro";
import { FlexColumnCentered } from "utils/styles";

export const SignUpContainer = styled.main`
	${FlexColumnCentered()};
`;

export const SignUpFormContent = styled.div`
	display: flex;
	${FlexColumnCentered()};
`;

export const AlreadyRegistered = styled.span`
	margin: 2rem auto;
`;
