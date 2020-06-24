import React, { useEffect } from 'react';

// Styles
import { ForgotPasswordStepContainer, ForgotPasswordForm } from '../ForgotPassword.Styles';

// Common Components
import { Button, Input } from 'components';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useFormInput } from 'hooks';

// Validation helpers
import { emailValidation } from 'features/Auth/SignUp/SignUp.Validations';

// Selectors
import { selectPasswordReset } from 'features/Auth/Auth.selectors';

// Auth Slice
import Auth from 'features/Auth/Auth.reducer';

// Helpers
import { serverNotResponding, emailNotFound } from 'utils';

export const ForgotPasswordStepOne: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const { success, error, loading } = useSelector(selectPasswordReset);

	// Local State
	const {
		inputValue: email,
		setValue: setEmail,
		hasError: emailHasError,
		errorMessage: emailErrorMessage,
		setError: setEmailError,
		validate: validateEmail,
	} = useFormInput('', emailValidation);

	// Handlers
	const submitHandler = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		dispatch(Auth.actions.resetPasswordRequest({ email }));
	};

	// Effects
	useEffect(() => {
		if (error?.message === emailNotFound.message) {
			setEmailError(emailNotFound.friendlyMessage);
		}
		if (error?.message === serverNotResponding.message) {
			setEmailError(serverNotResponding.message);
		}
	}, [error, setEmailError]);

	useEffect(() => {
		if (success) {
			setEmailError('');
			console.log('success', success);
			// TODO --> Add global notification to suggest user to check inbox
		}
	}, [success, setEmailError]);

	return (
		<ForgotPasswordStepContainer id="ForgotPasswordStepOne-Container">
			<ForgotPasswordForm id="ForgotPasswordStepOne-Form">
				<Input
					errorMessage={emailErrorMessage}
					hasError={emailHasError}
					id="SignUp-Email"
					label="Tu email"
					name="email"
					onBlur={validateEmail}
					onChange={setEmail}
					placeholder="usuario@ejemplo.com"
					tooltipText="Recibirás un enlace para generar una nueva contraseña en tu correo electrónico"
					type="email"
					variant="withTooltip"
					width="100%"
					value={email}
				/>

				<Button
					isBlock
					isLoading={loading}
					isDisabled={email === ''}
					margin="4rem 0 0 0"
					onClick={submitHandler}
					size="normal"
					variant="primary"
					type="submit"
				>
					Continuar
				</Button>
			</ForgotPasswordForm>
		</ForgotPasswordStepContainer>
	);
};

ForgotPasswordStepOne.displayName = 'ForgotPasswordStepOne';
