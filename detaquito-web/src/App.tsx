import React, { useMemo } from "react";

// Styled-Components Theme Provider
import { ThemeProvider } from "styled-components/macro";

// Components
import { Layout, Alert } from "components";

// Router
import Router from "router";

// Hooks
import { useTheme } from "hooks";

// Styles
import "rc-tooltip/assets/bootstrap.css";
import { ResetStyles, GlobalStyles } from "style";

// Types
import { Theme, dark, light } from "theme";

const App: React.FC = () => {
	// Hooks
	const [currentTheme] = useTheme();

	// Memos
	const theme = useMemo(() => (currentTheme === Theme.DARK ? dark : light), [currentTheme]);

	return (
		<ThemeProvider theme={theme}>
			<ResetStyles />
			<GlobalStyles />
			<Alert />
			<Layout>
				<Router />
			</Layout>
		</ThemeProvider>
	);
};

export default App;
