import React, { useEffect, useState } from 'react';

// Hooks
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { ForgotPasswordContainer, NotRegistered } from './ForgotPassword.Styles';

// Assets
import Logo from 'assets/img/logo.png';

// Common Components
import { Card, Image } from 'components';

// Components
import { ForgotPasswordStepOne } from './components/ForgotPasswordStepOne';
import { ForgotPasswordStepTwo } from './components/ForgotPasswordStepTwo';

// Auth Slice
import Auth from 'features/Auth/Auth.reducer';

// Selectors
import { selectPasswordTokenValidation } from 'features/Auth/Auth.selectors';

// Helpers
import { invalidToken } from 'utils';

export const ForgotPassword: React.FC = () => {
	// Local State
	const [currentStep, setCurrentStep] = useState(0);
	const [hasInvalidToken, setHasInvalidToken] = useState(false);

	// Hooks
	const [queryString] = useSearchParams();
	const token = queryString.get('token');
	const dispatch = useDispatch();
	// TODO --> Add full screen loader while loading
	const { data: userData, error } = useSelector(selectPasswordTokenValidation);

	useEffect(() => {
		if (token) {
			dispatch(Auth.actions.passwordResetTokenValidationRequest(token));
			setCurrentStep(2);
		} else {
			setCurrentStep(1);
		}
	}, [setCurrentStep, dispatch, token]);

	useEffect(() => {
		if (error === invalidToken) setHasInvalidToken(true);
	}, [error]);

	return (
		<ForgotPasswordContainer>
			<Image alt="De Taquito" margin="0 0 4rem 0" src={Logo} width="120px" />
			<Card title="Tu Cuenta" subTitle="Genera una nueva clave">
				{currentStep === 1 && <ForgotPasswordStepOne />}
				{currentStep === 2 && (
					<ForgotPasswordStepTwo hasInvalidToken={hasInvalidToken} userId={userData?.id} />
				)}
			</Card>
			<NotRegistered>
				¿No tienes una cuenta? <a href="/session/signup">Registrate.</a>
			</NotRegistered>
		</ForgotPasswordContainer>
	);
};

ForgotPassword.displayName = 'ForgotPassword';
