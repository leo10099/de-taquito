import React, { useCallback, useEffect } from "react";

// Common Components
import { Button, TextInput } from "components";

// Hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Selectors
import { selectPasswordReset } from "features/Auth/Auth.selectors";

// Auth Slice
import Auth from "features/Auth/Auth.reducer";

// Helpers
import { emailPattern } from "utils/validation";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Notification Slice
import Notification from "features/Notification/Notification.reducer";

// Errors
import { emailNotFound } from "features/Auth/Auth.errors";

// Helpers
import { serverNotResponding } from "utils/errorMessages";

// Styles
import { ForgotPasswordStepContainer, ForgotPasswordForm } from "../ForgotPassword.Styles";

const ForgotPasswordStepOne = () => {
	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, formState, setError } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});
	const { errors } = formState;

	// Selectors
	const { success, error, loading } = useSelector(selectPasswordReset);

	// Handlers
	const onSubmit = useCallback(
		({ email }: { email: string }) => {
			dispatch(Auth.actions.resetPasswordRequest({ email }));
		},
		[dispatch]
	);

	// Handle errors
	useEffect(() => {
		switch (error?.message) {
			case emailNotFound.message:
				return setError("email", { type: "manual", message: emailNotFound.friendlyMessage });
			case serverNotResponding.message:
				return setError("passwordConfirm", {
					type: "manual",
					message: serverNotResponding.message,
				});
			default:
				return () => {};
		}
	}, [error, setError]);

	useEffect(() => {
		if (success) {
			dispatch(
				Notification.actions.openAlert({
					type: "success",
					text: "Te enviamos un enlace a tu correo para generar una nueva contraseña.",
				})
			);
			navigate("/");
		}
	}, [success, dispatch, navigate]);

	return (
		<ForgotPasswordStepContainer id="ForgotPasswordStepOne-Container">
			<ForgotPasswordForm id="ForgotPasswordStepOne-Form" onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					errorMessage={errors.email?.message}
					hasError={!!errors.email}
					id="ForgotPassword-Email"
					label="Tu email"
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
					tooltipText="Recibirás un enlace para generar una nueva contraseña en tu correo electrónico"
					type="email"
					width="100%"
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
			</ForgotPasswordForm>
		</ForgotPasswordStepContainer>
	);
};

export default ForgotPasswordStepOne;
