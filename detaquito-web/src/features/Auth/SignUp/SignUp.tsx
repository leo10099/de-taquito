import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Components
import { Button, Card, Image, TextInput } from "components";

// Helpers
import { emailPattern } from "utils/validation";

// Validations
import validation from "./SignUp.validations";

// Selectors
import { selectRegistration } from "features/Auth/Auth.selectors";

// Assets
import Logo from "assets/img/logo.png";

// Slice
import Auth from "../Auth.reducer";

// Styles
import { SignUpContainer, SignUpFormContent } from "./Signup.Styles";

const SignUp: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const { register, handleSubmit, getValues, errors } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const { success: createdUser, error, loading } = useSelector(selectRegistration);

	// Handlers
	const onSubmit = (data: any) => {
		// Put together new user data object
		const newUserData = {
			alias: data.alias,
			email: data.email.trim(),
			secret: data.password,
		};
		dispatch(Auth.actions.registrationRequest(newUserData));
	};

	return (
		<SignUpContainer>
			<Image alt="De Taquito" margin="4rem auto" src={Logo} width="130px" />
			<Card title="Registrate" subTitle="para poder jugar">
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
