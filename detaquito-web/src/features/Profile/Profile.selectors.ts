// Typings
import { RootState, StoreSliceAction } from "store";

// Current theme
export const selectProfileEdition = (state: RootState): StoreSliceAction => state.profile.update;
