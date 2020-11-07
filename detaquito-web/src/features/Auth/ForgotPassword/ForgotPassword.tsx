import React, { useEffect, useState } from "react";

// Hooks
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Assets
import Logo from "assets/img/logo.png";

// Auth Slice
import Auth from "features/Auth/Auth.reducer";

// Common Components
import { Card, Image, Link, Spinner } from "components";

// Components
import StepOne from "./components/ForgotPasswordStepOne";
import StepTwo from "./components/ForgotPasswordStepTwo";

// Selectors
import { selectPasswordTokenValidation } from "features/Auth/Auth.selectors";

// Helpers
import { invalidToken } from "utils/errorMessages";

// Styles
import { ForgotPasswordContainer, NotRegistered } from "./ForgotPassword.Styles";

const ForgotPassword: React.FC = () => {
	// Local State
	const [currentStep, setCurrentStep] = useState(0);
	const [hasInvalidToken, setHasInvalidToken] = useState(false);

	// Hooks
	const dispatch = useDispatch();
	const [queryString] = useSearchParams();
	const token = queryString.get("token");
	const redirectedAfterInvalidToken = queryString.get("invalid");
	const { data: userData, error, loading } = useSelector(selectPasswordTokenValidation);

	// Effects
	useEffect(() => {
		if (token && !redirectedAfterInvalidToken) {
			dispatch(Auth.actions.passwordResetTokenValidationRequest(token));
			setCurrentStep(currentStep => currentStep + 1);
		}
	}, [setCurrentStep, dispatch, token, redirectedAfterInvalidToken]);

	useEffect(() => {
		if (error === invalidToken) {
			setHasInvalidToken(true);
		}
	}, [error]);

	useEffect(() => {
		if (redirectedAfterInvalidToken) {
			setHasInvalidToken(false);
			setCurrentStep(0);
		}
	}, [hasInvalidToken, redirectedAfterInvalidToken]);

	// Loading State
	if (!token && loading) return <Spinner />;

	return (
		<ForgotPasswordContainer id="ForgotPassword">
			<Image alt="De Taquito" margin="0 0 4rem 0" src={Logo} width="120px" />
			<Card title="Tu Cuenta" subTitle="Genera una nueva clave">
				{hasInvalidToken && (
					<p>
						Oops. Este enlace ya no funciona. <Link to="?invalid=true">Intenta de nuevo.</Link>
					</p>
				)}
				{!hasInvalidToken && currentStep === 0 && <StepOne />}
				{!hasInvalidToken && currentStep === 1 && <StepTwo userId={userData?.id} />}
			</Card>
			<NotRegistered>
				¿No tienes una cuenta? <Link to="/auth/signup">Registrate.</Link>
			</NotRegistered>
		</ForgotPasswordContainer>
	);
};

export default ForgotPassword;
