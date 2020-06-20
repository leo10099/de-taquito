import sc, { ThemedStyledInterface, css, keyframes } from 'styled-components';
import { ThemeInterface } from 'theme/Theme';
import GlobalStyles from './Global';
import ResetStyles from './Reset';

export { GlobalStyles, ResetStyles };
export { css, keyframes };
export default sc as ThemedStyledInterface<ThemeInterface>;
