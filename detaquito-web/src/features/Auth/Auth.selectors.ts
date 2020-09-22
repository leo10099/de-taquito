// Typings
import { RootState, StoreSliceAction } from "store";

// Token management
export const selectAccessToken = (state: RootState): string => state.auth.token.accessToken;
export const selectAccessTokenExpiry = (state: RootState): number | undefined =>
	state.auth.token.accessTokenExpiry;

// Login
export const selectLogin = (state: RootState): StoreSliceAction => state.auth.login;

// Registration
export const selectRegistration = (state: RootState): StoreSliceAction => state.auth.registration;

// Password reset
export const selectPasswordReset = (state: RootState): StoreSliceAction => state.auth.passwordReset;
export const selectPasswordTokenValidation = (state: RootState): StoreSliceAction =>
	state.auth.passwordResetTokenValidation;
export const selectForgottenPasswordReplacement = (state: RootState): StoreSliceAction =>
	state.auth.passwordResetReplacement;

// User Session
export const selectCurrentUser = (state: RootState) => state.auth.user;
