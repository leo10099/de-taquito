import React, { useEffect, useMemo } from 'react';

// Hot Reload
import { hot } from 'react-hot-loader';

// Router
import { Router } from 'router/Router';

// Themes
import * as Themes from 'theme/Theme';

// Styled-Components Theme Provider
import { ThemeProvider } from 'styled-components';

// Styles
import { ResetStyles, GlobalStyles } from 'styles';
import 'rc-tooltip/assets/bootstrap.css';

// Hooks
import { useTheme } from 'hooks';
import { useDispatch } from 'react-redux';

// Store
import Layout from 'features/Layout/Layout.reducer';

// Types
import { Theme } from 'typings';

// Components
import { Alert } from 'components';

const App = () => {
	// Hooks
	const dispatch = useDispatch();
	const [currentTheme] = useTheme();

	// Helpers
	const theme = useMemo(() => {
		return currentTheme === Theme.DARK ? Themes.dark : Themes.light;
	}, [currentTheme]);

	// Effects
	useEffect(() => {
		dispatch(Layout.actions.setTheme(currentTheme));
	}, [currentTheme, dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<ResetStyles />
			<GlobalStyles />
			<Alert />
			<Router />
		</ThemeProvider>
	);
};

export default hot(module)(App);
