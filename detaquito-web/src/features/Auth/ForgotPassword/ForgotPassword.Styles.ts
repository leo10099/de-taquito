import styled from "styled-components/macro";
import { FlexColumnCentered } from "utils/styles";

// ForgotPassword
export const ForgotPasswordContainer = styled.section`
	${FlexColumnCentered()};
	margin-top: 4rem;
`;

export const ForgotPasswordStepContainer = styled.section`
	margin-top: 2rem;
`;

// ForgotPasswordForm
export const ForgotPasswordForm = styled.form.attrs(({ id }) => ({
	id,
}))`
	${FlexColumnCentered()};
`;

// NotRegistered
export const NotRegistered = styled.span`
	margin: 2rem auto;
`;
