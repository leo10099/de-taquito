import React, { useMemo } from "react";

// Styled-Components Theme Provider
import { ThemeProvider } from "styled-components/macro";

// Router
import Router from "router";

// Hooks
import { useTheme } from "hooks";

// Styles
import "rc-tooltip/assets/bootstrap.css";
import { ResetStyles, GlobalStyles } from "style";

// Types
import { Theme, dark, light } from "theme";

function App() {
	// Hooks
	const [currentTheme] = useTheme();

	// Memos
	const theme = useMemo(() => {
		return currentTheme === Theme.DARK ? dark : light;
	}, [currentTheme]);

	return (
		<ThemeProvider theme={theme}>
			<ResetStyles />
			<GlobalStyles />
			<Router />
		</ThemeProvider>
	);
}

export default App;
