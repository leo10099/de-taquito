import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Hooks
import { useFormInput } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import Logo from 'assets/img/logo.png';

// Auth Slice
import Auth from 'features/Auth/Auth.reducer';

// Selectors
import { selectLogin } from 'features/Auth/Auth.selectors';

// Common Components
import { Button, Card, Icon, Image, Input, Separator } from 'components';

// Styles
import { LogInContainer, LogInForm, NotRegistered } from './LogIn.Styles';
import {
	centeredText,
	incorrectLogInCredentials,
	shouldLoginWithGoogle,
	serverNotResponding,
} from 'utils';

export const LogIn: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();

	// Selectors
	const { success, error, loading } = useSelector(selectLogin);

	// Local State
	const { inputValue: email, setValue: setEmail } = useFormInput('');
	const {
		inputValue: password,
		setValue: setPassword,
		hasError: passwordHasError,
		errorMessage: passwordErrorMessage,
		setError: setPasswordError,
	} = useFormInput('');

	// Handlers
	const logInWithGoogleHandler = () => window.location.replace('/api/auth/google');

	const logInSubmitHandler = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	): void => {
		e.preventDefault();
		const userInput = { email: email.trim(), secret: password };
		dispatch(Auth.actions.loginRequest(userInput));
	};

	// Effects
	useEffect(() => {
		if (error?.message === incorrectLogInCredentials.message) {
			setPasswordError(incorrectLogInCredentials.friendlyMessage);
		}
		if (error?.message === serverNotResponding.message) {
			setPasswordError(serverNotResponding.message);
		}
		if (error?.message === shouldLoginWithGoogle.message) {
			setPasswordError(shouldLoginWithGoogle.friendlyMessage);
		}
	}, [error, setPasswordError]);

	useEffect(() => {
		if (success) window.location.replace('/app/dashboard');
	}, [success]);

	return (
		<LogInContainer>
			<Image alt="De Taquito" margin="0 0 4rem 0" src={Logo} width="120px" />
			<Card title="Inicia sesión" subTitle="para continuar">
				<LogInForm>
					<Button
						margin="2rem auto"
						onClick={logInWithGoogleHandler}
						size="normal"
						variant="primary"
					>
						<>
							<Icon type="Google" />
							Ingresa con Google
						</>
					</Button>

					<Separator>O</Separator>

					<Input
						hasError={passwordHasError}
						id="LogIn-Email"
						label="E-mail"
						name="alias"
						onChange={setEmail}
						type="text"
						value={email}
					/>

					<Input
						hasError={passwordHasError}
						errorMessage={passwordErrorMessage}
						id="LogIn-Password"
						label="Tu contraseña"
						name="password"
						onChange={setPassword}
						type="password"
						value={password}
					/>

					<Button
						isBlock
						isLoading={loading}
						isDisabled={email === '' || password === ''}
						margin="2rem auto"
						onClick={logInSubmitHandler}
						size="normal"
						variant="primary"
						type="submit"
					>
						Continuar
					</Button>
				</LogInForm>

				<Link to="/session/forgot" style={centeredText}>
					¿No recuerdas tu clave?
				</Link>
			</Card>
			<NotRegistered>
				¿No tienes una cuenta? <a href="/session/signup">Registrate.</a>
			</NotRegistered>
		</LogInContainer>
	);
};

LogIn.displayName = 'LogIn';
