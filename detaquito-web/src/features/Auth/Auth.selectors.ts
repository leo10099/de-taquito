// Typings
import { RootState } from 'store';
import { StoreSliceAction } from 'typings';

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

// User Session
export const selectCurrentUser = (state: RootState) => state.auth.user;
