import styled from "styled-components/macro";
import { FlexColumnCentered } from "utils/styles";

export const LogInContainer = styled.main`
	${FlexColumnCentered()};
	width: 100vw;
`;

export const LogInFormContent = styled.div`
	${FlexColumnCentered()};
`;

export const NotRegistered = styled.span`
	margin: 2rem auto;
`;
