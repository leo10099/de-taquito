import styled from 'styles';
import { FlexColumnCentered } from 'utils';

// ForgotPassword
export const ForgotPasswordContainer = styled.section.attrs(() => ({
	id: 'ForgotPassword-Container',
}))`
	${FlexColumnCentered()};
	margin-top: 4rem;
`;

export const ForgotPasswordStepContainer = styled.form.attrs(({ id }) => ({
	id,
}))`
	margin-top: 2rem;
`;

// ForgotPasswordForm
export const ForgotPasswordForm = styled.form.attrs(({ id }) => ({
	id,
}))`
	${FlexColumnCentered()};
`;

// Display Names
ForgotPasswordContainer.displayName = 'ForgotPassword-Container';
ForgotPasswordForm.displayName = 'ForgotPassword-ForgotPasswordForm';
ForgotPasswordStepContainer.displayName = 'ForgotPassword-StepContainer';
