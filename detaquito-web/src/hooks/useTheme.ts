import { useMedia, useLocalStorage } from "hooks";

function usePrefersDarkMode(): any {
	return useMedia(["(prefers-color-scheme: dark)"], ["dark"], "light");
}

export function useTheme(): [string, () => void] {
	const [enabledState, setEnabledState] = useLocalStorage("preferred-theme", true);

	// See if user has set a browser or OS preference for dark mode.
	const prefersDarkMode = usePrefersDarkMode();

	// If enabledState is defined use it, otherwise fallback to prefersDarkMode.
	const enabled = typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;

	// Return enabled state and setter
	return [enabled, setEnabledState];
}
