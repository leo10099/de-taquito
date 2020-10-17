import React, { useCallback, useEffect } from "react";

// Hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Components
import { Button, Card, Image, Separator, TextInput } from "components";

// Helpers
import { emailPattern } from "utils/validation";

// Validations
import validation from "./SignUp.validations";

// Selectors
import { selectRegistration } from "features/Auth/Auth.selectors";

// Assets
import Logo from "assets/img/logo.png";
import { ReactComponent as GoogleIcon } from "assets/icons/google.svg";

// Slice
import Auth from "../Auth.reducer";

// Typings
import { SignUpFormData } from "features/Auth/Auth.types";

// Error messages
import {
	conflictingAlias,
	conflictingEmail,
	conflictUserAlreadyRegisteredWithGoogle,
} from "features/Auth/Auth.errors";
import { serverNotResponding } from "utils/errorMessages";

// Styles
import { SignUpContainer, SignUpFormContent } from "./SignUp.Styles";

const SignUp: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, getValues, errors, setError } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const { success: createdUser, error, loading } = useSelector(selectRegistration);

	// Handlers
	const onSubmit = useCallback(
		({ alias, email, password }: SignUpFormData) => {
			// Put together new user data object
			const newUserData = {
				alias,
				email: email.trim(),
				secret: password,
			};

			dispatch(Auth.actions.registrationRequest(newUserData));
		},
		[dispatch]
	);

	// Handlers
	const signUpWithGoogle = () => {
		window.location.replace("/api/auth/google");
	};

	// Handle successful registration
	useEffect(() => {
		if (createdUser) {
			navigate("/app/dashboard");
		}
	}, [createdUser, navigate]);

	// Handle unsuccessful registration
	useEffect(() => {
		switch (error?.message) {
			case conflictingEmail.message:
				return setError("email", { type: "manual", message: conflictingEmail.friendlyMessage });
			case conflictingAlias.message:
				return setError("alias", { type: "manual", message: conflictingAlias.friendlyMessage });
			case conflictUserAlreadyRegisteredWithGoogle.message:
				return setError("email", {
					type: "manual",
					message: conflictUserAlreadyRegisteredWithGoogle.friendlyMessage,
				});
			case serverNotResponding.message:
				return setError("passwordConfirm", {
					type: "manual",
					message: serverNotResponding.message,
				});
			default:
				return () => {};
		}
	}, [error, setError]);

	return (
		<SignUpContainer>
			<Image alt="De Taquito" margin="4rem auto" src={Logo} width="130px" />

			<Button
				icon={<GoogleIcon />}
				margin="2rem auto"
				onClick={signUpWithGoogle}
				size="normal"
				variant="primary"
			>
				Registrate con Google
			</Button>

			<Separator mt={2} mb={4}>
				O
			</Separator>

			<Card title="Registrate" subTitle="con usuario y contraseña" mb={4}>
				<form onSubmit={handleSubmit(onSubmit)} id="Signup-Form">
					<SignUpFormContent>
						<TextInput
							defaultValue=""
							errorMessage={errors.email?.message}
							hasError={!!errors.email}
							id="SignUp-Email"
							isFullWidth
							label="Tu e-mail"
							name="email"
							ref={register({
								required: validation.email.required,
								maxLength: {
									value: 50,
									message: validation.email.maxLength,
								},
								pattern: {
									value: emailPattern,
									message: validation.email.pattern,
								},
							})}
							placeholder="usuario@ejemplo.com"
							type="email"
						/>

						<TextInput
							defaultValue=""
							errorMessage={errors.alias?.message}
							hasError={!!errors.alias}
							id="SignUp-Alias"
							isFullWidth
							label="Tu nombre de usuario"
							name="alias"
							placeholder="Nombre"
							ref={register({
								required: validation.alias.required,
								maxLength: {
									value: 50,
									message: validation.alias.maxLength,
								},
							})}
							tooltipText="Con este nombre aparecerás en las tablas de posiciones"
							type="text"
						/>

						<TextInput
							defaultValue=""
							hasError={!!errors.password}
							id="SignUp-Password"
							isFullWidth
							name="password"
							errorMessage={errors.password?.message}
							type="password"
							label="Contraseña"
							ref={register({
								required: "Debes ingresar una contraseña",
								maxLength: {
									value: 50,
									message: validation.password.maxLength,
								},
								minLength: {
									value: 6,
									message: validation.password.minLength,
								},
							})}
							tooltipText="La contraseña debe tener al menos 6 caracteres"
						/>

						<TextInput
							defaultValue=""
							hasError={!!errors.passwordConfirm}
							errorMessage={errors.passwordConfirm?.message}
							id="SignUp-PasswordConfirm"
							isFullWidth
							name="passwordConfirm"
							type="password"
							label="Confima tu contraseña"
							ref={register({
								required: validation.confirmPassword.required,
								validate: value =>
									value === getValues()["password"] || validation.confirmPassword.matchPassword,
								minLength: {
									value: 6,
									message: validation.confirmPassword.minLength,
								},
							})}
						/>

						<Button
							isBlock
							isLoading={loading}
							isDisabled={!!Object.keys(errors).length}
							margin="2rem auto"
							size="normal"
							variant="primary"
							type="submit"
						>
							Continuar
						</Button>
					</SignUpFormContent>
				</form>
			</Card>
		</SignUpContainer>
	);
};

export default SignUp;
