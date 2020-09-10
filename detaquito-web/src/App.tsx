import React, { useMemo } from "react";

// Styled-Components Theme Provider
import { ThemeProvider } from "styled-components/macro";

// Hooks
import { useTheme } from "hooks";

// Styles
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
			<div className="App">APP</div>
		</ThemeProvider>
	);
}

export default App;
