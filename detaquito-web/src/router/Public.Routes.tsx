import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Routes
import { Home } from 'features/Home/Home';
import { NotFound } from 'components/NotFound';
import { LogIn } from 'features/Auth/LogIn/LogIn';
import { SignUp } from 'features/Auth/SignUp/SignUp';
import { ForgotPassword } from 'features/Auth/ForgotPassword/ForgotPassword';

// Private Routes
import { Private } from './Private.Routes';

export const Public = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/session/signup" element={<SignUp />} />
			<Route path="/session/login" element={<LogIn />} />
			<Route path="/session/forgot" element={<ForgotPassword />} />
			<Route path="app/*" element={<Private />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
