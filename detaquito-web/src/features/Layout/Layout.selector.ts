// Typings
import { RootState } from 'store';

// Current theme
export const selectCurrentTheme = (state: RootState): string => state.layout.theme;
