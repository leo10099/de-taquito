import styled from 'styles';
import { FlexColumnCentered } from 'utils';

// LogInContainer
export const LogInContainer = styled.section.attrs(() => ({
	id: 'LogIn-Container',
}))`
	${FlexColumnCentered()};
	margin-top: 4rem;
`;

// LogInForm
export const LogInForm = styled.form.attrs(() => ({
	id: 'LogIn-Form',
}))`
	${FlexColumnCentered()};
`;

// NotRegistered
export const NotRegistered = styled.span`
	margin: 2rem auto;
`;

// Display Names
LogInContainer.displayName = 'LogIn-Container';
LogInForm.displayName = 'LogIn-Form';
NotRegistered.displayName = 'LogIn-NotRegistered';
