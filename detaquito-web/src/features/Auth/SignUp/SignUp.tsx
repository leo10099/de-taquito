import React, { useCallback, useEffect, useMemo } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormInput } from 'hooks';

// Common Components
import { Button, Card, Icon, Image, Input, Separator } from 'components';

// Styles
import { AlreadyRegistered, SignUpForm, SignUpContainer } from './SignUp.Styles';

// Validation helpers
import { aliasValidation, emailValidation, passwordValidation } from './SignUp.Validations';

// Error messages
import { conflictingAlias, conflictingEmail } from 'features/Auth/Auth.errors';

// Assets
import Logo from 'assets/img/logo.png';

// Auth Slice
import Auth from 'features/Auth/Auth.reducer';

// Selectors
import { selectRegistration } from 'features/Auth/Auth.selectors';
import { serverNotResponding } from 'utils';

export const SignUp: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Selectors
	const { success: createdUser, error, loading } = useSelector(selectRegistration);

	// Local State
	const {
		inputValue: email,
		setValue: setEmail,
		hasError: emailHasError,
		errorMessage: emailErrorMessage,
		setError: setEmailError,
		validate: validateEmail,
	} = useFormInput('', emailValidation);
	const {
		inputValue: alias,
		setValue: setAlias,
		hasError: aliasHasError,
		errorMessage: aliasErrorMessage,
		setError: setAliasError,
		validate: validateAlias,
	} = useFormInput('', aliasValidation);
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

	// Helpers
	const shouldDisableSubmitButton = useMemo(() => {
		if (!email || !alias || !password || !passwordConfirmation) {
			return true;
		}
		if (emailHasError || aliasHasError || passwordHasError || passwordConfirmationHasError) {
			return true;
		}
		return false;
	}, [
		alias,
		aliasHasError,
		email,
		emailHasError,
		password,
		passwordConfirmation,
		passwordConfirmationHasError,
		passwordHasError,
	]);

	// Handlers
	const signUpWithGoogleHandler = () => {
		window.location.replace('/api/auth/google');
	};

	const formSubmitHandler = useCallback(
		(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): boolean => {
			e.preventDefault();
			// Perform pre-submit validations
			if (shouldDisableSubmitButton) return false;
			if (password !== passwordConfirmation) {
				setPasswordError('La contraseñas que ingresaste no coinciden');
				return false;
			}

			// Put together new user data object
			const newUserData = {
				alias: alias,
				email: email.trim(),
				secret: password,
			};

			dispatch(Auth.actions.registrationRequest(newUserData));
			return true;
		},
		[
			alias,
			dispatch,
			email,
			password,
			passwordConfirmation,
			setPasswordError,
			shouldDisableSubmitButton,
		]
	);

	//Effects
	// Handle successful registration
	useEffect(() => {
		if (createdUser) {
			navigate('/app/dashboard');
		}
	}, [createdUser, navigate]);

	// Handle unsuccesful registration
	useEffect(() => {
		switch (error?.message) {
			case conflictingEmail.message:
				return setEmailError(conflictingEmail.friendlyMessage);
			case conflictingAlias.message:
				return setAliasError(conflictingAlias.friendlyMessage);
			case serverNotResponding.message:
				return setPasswordError(serverNotResponding.message);
			default:
				return () => {};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	return (
		<SignUpContainer>
			<Image alt="De Taquito" margin="0 0 2rem 0" src={Logo} width="120px" />
			<Card subTitle="para poder jugar" title="Registrate">
				<SignUpForm>
					<Button
						margin="2rem auto"
						onClick={signUpWithGoogleHandler}
						size="normal"
						variant="primary"
					>
						<>
							<Icon type="Google" />
							Registrate con Google
						</>
					</Button>

					<Separator>O</Separator>

					<Input
						errorMessage={emailErrorMessage}
						hasError={emailHasError}
						id="SignUp-Email"
						label="Tu email"
						name="email"
						onBlur={validateEmail}
						onChange={setEmail}
						placeholder="usuario@ejemplo.com"
						type="email"
						value={email}
					/>
					<Input
						errorMessage={aliasErrorMessage}
						hasError={aliasHasError}
						id="SignUp-Alias"
						label="Tu nombre de usuario"
						name="alias"
						onBlur={validateAlias}
						onChange={setAlias}
						placeholder="Nombre"
						tooltipText="Con este nombre aparecerás en las tablas de posiciones"
						type="text"
						variant="withTooltip"
						value={alias}
					/>
					<Input
						errorMessage={passwordErrorMessage}
						hasError={passwordHasError}
						id="SignUp-Password"
						label="Tu contraseña"
						name="alias"
						onBlur={validatePassword}
						onChange={setPassword}
						placeholder="Contraseña"
						tooltipText="La contraseña debe tener al menos 6 caracteres"
						type="password"
						variant="withTooltip"
						value={password}
					/>
					<Input
						errorMessage={passwordConfirmationErrorMessage}
						hasError={passwordConfirmationHasError}
						id="SignUp-PasswordConfirmation"
						label="Confirma tu contraseña"
						name="aliasConfirm"
						onBlur={validatePasswordConfirm}
						onChange={setPasswordConfirmation}
						placeholder="Contraseña"
						type="password"
						value={passwordConfirmation}
					/>

					<Button
						isBlock
						isLoading={loading}
						isDisabled={shouldDisableSubmitButton}
						margin="2rem 0 0 0"
						onClick={formSubmitHandler}
						size="normal"
						variant="primary"
						type="submit"
					>
						Continuar
					</Button>
				</SignUpForm>
			</Card>

			<AlreadyRegistered>
				¿Ya tienes una cuenta? <a href="/login">Ingresa.</a>
			</AlreadyRegistered>
		</SignUpContainer>
	);
};
