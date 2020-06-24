import styled from 'styles';
import { FlexColumnCentered } from 'utils';

// ForgotPassword
export const ForgotPasswordContainer = styled.section.attrs(() => ({
	id: 'ForgotPassword-Container',
}))`
	${FlexColumnCentered()};
	margin-top: 4rem;
`;

export const ForgotPasswordStepContainer = styled.section.attrs(({ id }) => ({
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

// NotRegistered
export const NotRegistered = styled.span`
	margin: 2rem auto;
`;

// Display Names
ForgotPasswordContainer.displayName = 'ForgotPassword-Container';
ForgotPasswordForm.displayName = 'ForgotPassword-ForgotPasswordForm';
ForgotPasswordStepContainer.displayName = 'ForgotPassword-StepContainer';
NotRegistered.displayName = 'ForgotPassword-NotRegistered';
