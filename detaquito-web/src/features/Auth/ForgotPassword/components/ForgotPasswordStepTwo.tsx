import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { useFormInput } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Components
import { Button, Input } from 'components';

// Auth Slice
import Auth from 'features/Auth/Auth.reducer';

// Notification Slice
import Notification from 'features/Notification/Notification.reducer';

// Selectors
import { selectForgottenPasswordReplacement } from 'features/Auth/Auth.selectors';

// Validation helpers
import { passwordValidation } from 'features/Auth/SignUp/SignUp.Validations';

// Styles
import { ForgotPasswordStepContainer, ForgotPasswordForm } from '../ForgotPassword.Styles';

// Helpers
import { passwordsDoNotMatch, unkownErrorOnAction } from 'utils';

type ForgotPasswordStepTwoProps = {
	hasInvalidToken: boolean;
	userId?: number;
};

export const ForgotPasswordStepTwo: React.FC<ForgotPasswordStepTwoProps> = ({
	hasInvalidToken,
	userId,
}) => {
	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Selectors
	const { success, loading, error } = useSelector(selectForgottenPasswordReplacement);

	// Local State
	const {
		inputValue: password,
		setValue: setPassword,
		hasError: passwordHasError,
		errorMessage: passwordErrorMessage,
		validate: validatePassword,
	} = useFormInput('', passwordValidation);
	const {
		inputValue: passwordConfirmation,
		setValue: setPasswordConfirmation,
		hasError: passwordConfirmationHasError,
		errorMessage: passwordConfirmationErrorMessage,
		setError: setPasswordError,
		validate: validatePasswordConfirm,
	} = useFormInput('', passwordValidation);

	// Handlers
	const formSubmitHandler = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();

		// Perform pre-submit validations
		if (password !== passwordConfirmation) {
			setPasswordError(passwordsDoNotMatch.message);
			return;
		}
		if (password.length < 6 || passwordConfirmation.length < 6) {
			return;
		}

		// Put together data object
		const newPasswordData = {
			id: userId,
			secret: password,
		};

		dispatch(Auth.actions.passwordResetReplacementRequest(newPasswordData));
	};

	useEffect(() => {
		if (error) {
			dispatch(
				Notification.actions.openAlert({
					type: 'error',
					text: unkownErrorOnAction,
				})
			);
		}
	}, [dispatch, error]);

	useEffect(() => {
		if (success) {
			navigate('/session/login');
		}
	}, [navigate, success]);

	if (hasInvalidToken) return <p>Token Inválido</p>;

	return (
		<ForgotPasswordStepContainer id="ForgotPasswordStepTwo-Container">
			<ForgotPasswordForm id="ForgotPasswordStepTwo">
				<Input
					errorMessage={passwordErrorMessage}
					hasError={passwordHasError}
					id="ForgotPasswordStepTwo-Password"
					label="Tu nueva contraseña"
					name="secret"
					onBlur={validatePassword}
					onChange={setPassword}
					tooltipText="La contraseña debe tener al menos 6 caracteres"
					type="password"
					variant="withTooltip"
					value={password}
				/>
				<Input
					errorMessage={passwordConfirmationErrorMessage}
					hasError={passwordConfirmationHasError}
					id="ForgotPasswordStepTwo-PasswordConfirmation"
					label="Confirma tu nueva contraseña"
					name="secretConfirm"
					onBlur={validatePasswordConfirm}
					onChange={setPasswordConfirmation}
					type="password"
					value={passwordConfirmation}
				/>

				<Button
					isBlock
					isLoading={loading}
					isDisabled={password === '' || passwordConfirmation === ''}
					margin="2rem 0 0 0"
					onClick={formSubmitHandler}
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

ForgotPasswordStepTwo.propTypes = {
	hasInvalidToken: PropTypes.bool.isRequired,
	userId: PropTypes.number,
};
ForgotPasswordStepTwo.defaultProps = {
	userId: 0,
};

ForgotPasswordStepTwo.displayName = 'ForgotPassword-StepTwo';
