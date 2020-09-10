// Typings
import { RootState } from "store";

// Current theme
export const selectStatus = (state: RootState): string => state.connection.status;
