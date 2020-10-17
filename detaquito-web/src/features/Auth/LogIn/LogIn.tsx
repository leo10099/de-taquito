import React, { useCallback, useEffect } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Components
import { Button, Card, Image, Separator, TextInput } from "components";

// Slice
import Auth from "../Auth.reducer";

// Selectors
import { selectLogin } from "../Auth.selectors";

// Assets
import Logo from "assets/img/logo.png";
import { ReactComponent as GoogleIcon } from "assets/icons/google.svg";

// Helpers
import { incorrectCredentials, userShouldAuthenticateWithGoogle } from "../Auth.errors";
import { serverNotResponding } from "utils/errorMessages";
import { emailPattern } from "utils/validation";

// Validations
import validation from "../SignUp/SignUp.validations";

// Styles
import { LogInContainer, LogInFormContent } from "./LogIn.Styles";

const LogIn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, errors, setError } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const { success, error, loading } = useSelector(selectLogin);

	// Handlers
	const onSubmit = useCallback(
		({ email, password }: any) => {
			dispatch(Auth.actions.loginRequest({ email, secret: password }));
		},
		[dispatch]
	);

	// Effects
	useEffect(() => {
		console.log(error?.message);
		switch (error?.message) {
			case incorrectCredentials.message:
				return setError("password", {
					type: "manual",
					message: incorrectCredentials.friendlyMessage,
				});
			case userShouldAuthenticateWithGoogle.message:
				return setError("email", {
					type: "manual",
					message: userShouldAuthenticateWithGoogle.friendlyMessage,
				});
			case serverNotResponding.message:
				return setError("password", { type: "manual", message: serverNotResponding.message });
			default:
				return () => {};
		}
	}, [error, setError]);

	useEffect(() => {
		if (success) navigate("/app/dashboard");
	}, [navigate, success]);

	return (
		<LogInContainer>
			<Image alt="De Taquito" margin="4rem auto" src={Logo} width="130px" />

			<Button
				icon={<GoogleIcon />}
				margin="2rem auto"
				onClick={() => {}}
				size="normal"
				variant="primary"
			>
				Ingresa con Google
			</Button>

			<Separator mt={2} mb={4}>
				O
			</Separator>

			<Card title="Inicia sesión" subTitle="para continuar">
				<form onSubmit={handleSubmit(onSubmit)} id="Login-Form">
					<LogInFormContent>
						<TextInput
							defaultValue=""
							errorMessage={errors.email?.message}
							hasError={!!errors.email || !!errors.password}
							id="LogIn-Email"
							isFullWidth
							label="E-mail"
							name="email"
							placeholder="usuario@ejemplo.com"
							type="email"
							ref={register({
								required: "Debes ingresar tu e-mail",
								pattern: {
									value: emailPattern,
									message: validation.email.pattern,
								},
							})}
						/>
						<TextInput
							defaultValue=""
							errorMessage={errors.password?.message}
							hasError={!!errors.password}
							id="LogIn-Password"
							isFullWidth
							label="Contraseña"
							name="password"
							placeholder="*******"
							type="password"
							ref={register({ required: "Debes ingresar tu contraseña" })}
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
					</LogInFormContent>
				</form>
			</Card>
		</LogInContainer>
	);
};

export default LogIn;
