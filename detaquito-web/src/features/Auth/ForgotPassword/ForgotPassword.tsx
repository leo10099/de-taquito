import React from 'react';

// Styles
import { ForgotPasswordContainer, NotRegistered } from './ForgotPassword.Styles';

// Assets
import Logo from 'assets/img/logo.png';

// Common Components
import { Card, Image } from 'components';

// Components
import { ForgotPasswordStepOne } from './components/ForgotPasswordStepOne';

export const ForgotPassword: React.FC = () => {
	return (
		<ForgotPasswordContainer>
			<Image alt="De Taquito" margin="0 0 4rem 0" src={Logo} width="120px" />
			<Card title="Tu Cuenta" subTitle="Genera una nueva clave">
				<ForgotPasswordStepOne />
			</Card>
			<NotRegistered>
				¿No tienes una cuenta? <a href="/session/signup">Registrate.</a>
			</NotRegistered>
		</ForgotPasswordContainer>
	);
};

ForgotPassword.displayName = 'ForgotPassword';
