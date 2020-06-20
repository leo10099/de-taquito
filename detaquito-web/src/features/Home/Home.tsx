import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { HomeContainer } from './Home.Styles';

export const Home: React.FC = () => {
	return (
		<HomeContainer>
			<Link to="/session/signup">SIGN-UP</Link>
		</HomeContainer>
	);
};
