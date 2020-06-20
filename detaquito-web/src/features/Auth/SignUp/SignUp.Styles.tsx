import styled from 'styles';
import { FlexColumnCentered } from 'utils';

// SignUpContainer
export const SignUpContainer = styled.section.attrs(() => ({
	id: 'SignUp',
}))`
	${FlexColumnCentered()};
	margin-top: 4rem;
`;

// SignUpForm
export const SignUpForm = styled.form.attrs(() => ({
	id: 'SignUp-Form',
}))`
	${FlexColumnCentered()};
`;

// AlreadyRegistered
export const AlreadyRegistered = styled.span`
	margin: 2rem auto;
`;

// Display Names
SignUpContainer.displayName = 'SignUp-Container';
SignUpForm.displayName = 'SignUp-Form';
AlreadyRegistered.displayName = 'SignUp-AlreadyRegistered';
