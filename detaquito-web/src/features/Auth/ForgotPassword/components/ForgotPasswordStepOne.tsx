import React from 'react';

// Styles
import { ForgotPasswordStepContainer, ForgotPasswordForm } from '../ForgotPassword.Styles';

// Common Components
import { Button, Input } from 'components';

// Hooks
import { useFormInput } from 'hooks';

// Validation helpers
import { emailValidation } from 'features/Auth/SignUp/SignUp.Validations';

export const ForgotPasswordStepOne: React.FC = () => {
	// Local State
	const {
		inputValue: email,
		setValue: setEmail,
		hasError: emailHasError,
		errorMessage: emailErrorMessage,
		//setError: setEmailError,
		validate: validateEmail,
	} = useFormInput('', emailValidation);

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
					isLoading={false}
					isDisabled={false}
					margin="4rem 0 0 0"
					onClick={() => {}}
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
