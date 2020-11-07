import React, { useCallback, useEffect } from "react";

// Hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { Button, TextInput } from "components";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Helpers
import { unkownErrorOnAction } from "utils/errorMessages";

// Slices
import Auth from "features/Auth/Auth.reducer";
import Notification from "features/Notification/Notification.reducer";

// Selectors
import { selectForgottenPasswordReplacement } from "features/Auth/Auth.selectors";

// Styles
import { ForgotPasswordStepContainer, ForgotPasswordForm } from "../ForgotPassword.Styles";

interface ForgotPasswordStepTwoProps {
	userId?: number;
}

interface StepTwoFormData {
	password: string;
}

const ForgotPasswordStepTwo: React.FC<ForgotPasswordStepTwoProps> = ({
	userId,
}: ForgotPasswordStepTwoProps) => {
	// Hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, formState, getValues } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});
	const { errors } = formState;

	// Selectors
	const { success, loading, error } = useSelector(selectForgottenPasswordReplacement);

	// Handlers
	const onSubmit = useCallback(
		({ password }: StepTwoFormData) => {
			const newPasswordData = { secret: password, id: userId };
			dispatch(Auth.actions.passwordResetReplacementRequest(newPasswordData));
		},
		[dispatch, userId]
	);

	// Handle error
	useEffect(() => {
		if (error) {
			dispatch(
				Notification.actions.openAlert({
					type: "error",
					text: unkownErrorOnAction,
				})
			);
		}
	}, [dispatch, error]);

	// Handle success
	useEffect(() => {
		if (success) {
			dispatch(
				Notification.actions.openAlert({
					type: "success",
					text: "¡Bien! Generaste una nueva contraseña",
				})
			);

			navigate("/auth/login");
		}
	}, [dispatch, navigate, success]);

	return (
		<ForgotPasswordStepContainer id="ForgotPasswordStepTwo-Container">
			<ForgotPasswordForm id="ForgotPasswordStepTwo" onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					hasError={!!errors.password}
					id="ForgotPaswordStepTwo-Password"
					label="Tu nueva contraseña"
					tooltipText="Debe tener al menos 6 caracteres"
					type="password"
					name="password"
					errorMessage={errors.password?.message}
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
				/>
				<TextInput
					hasError={!!errors.passwordConfirm}
					errorMessage={errors.passwordConfirm?.message}
					id="ForgotPaswordStepTwo-PasswordConfirmation"
					label="Confirma tu nueva contraseña"
					type="password"
					name="passwordConfirm"
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
					margin="2rem 0 0 0"
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

export default ForgotPasswordStepTwo;
