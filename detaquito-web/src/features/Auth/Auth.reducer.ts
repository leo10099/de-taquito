/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Typings
import { StoreSliceAction } from "store";
import { SuccessfulAuthenticationPayload } from "features/Auth/Auth.types";

// Action Types
export type SetAccessTokenPayload = { accessToken: string; accessTokenExpiry?: number };
export type LoginPayload = { email: string; secret: string };
export type RegistrationPayload = { email: string; alias: string; secret: string };
export type UserPayload = { alias: string; avatar: string; email: string; sub: number };

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: {
			accessToken: "",
			accessTokenExpiry: 900 * 1000,
		} as SetAccessTokenPayload,
		registration: {
			error: null,
			loading: false,
		} as StoreSliceAction,
		login: {
			error: null,
			loading: false,
		} as StoreSliceAction,
		user: {
			alias: "",
			avatar: "",
			email: "",
			id: 0,
		},
		passwordReset: {
			error: null,
			loading: false,
		} as StoreSliceAction,
		passwordResetTokenValidation: {
			error: null,
			loading: false,
			data: null,
		} as StoreSliceAction,
		passwordResetReplacement: {
			error: null,
			loading: false,
		} as StoreSliceAction,
	},
	reducers: {
		// Token management
		tryRefreshToken: state => state,
		setAccessToken: (state, { payload }: PayloadAction<SetAccessTokenPayload>) => {
			state.token.accessToken = payload.accessToken;
			state.token.accessTokenExpiry = payload.accessTokenExpiry;
			return state;
		},
		//	User Session
		setUserInfoFromCookie: (state, { payload }) => {
			state.user.alias = payload.alias;
			state.user.avatar = payload.avatar;
			state.user.email = payload.email;
			state.user.id = payload.id;
			return state;
		},
		// Login
		loginRequest: ({ login }, _payload: PayloadAction<LoginPayload>) => {
			delete login.success;
			login.loading = true;
		},
		loginFailure: ({ login }, { payload }) => {
			login.loading = false;
			login.error = payload;
		},
		loginSuccess: (state, { payload }) => {
			state.user.alias = payload.alias;
			state.user.avatar = payload.avatar;
			state.user.email = payload.email;
			state.user.id = payload.id;

			// state.token.accessToken = payload.accessToken;
			// state.token.accessTokenExpiry = payload.accessTokenExpiry;

			state.login.loading = false;
			state.login.success = true;
		},
		// Registration
		registrationRequest: ({ registration }, _payload: PayloadAction<RegistrationPayload>) => {
			delete registration.success;
			registration.loading = true;
		},
		registrationFailure: ({ registration }, { payload }) => {
			registration.loading = false;
			registration.error = payload;
		},
		registrationSuccess: (state, { payload }: PayloadAction<SuccessfulAuthenticationPayload>) => {
			state.user.alias = payload.alias;
			state.user.avatar = payload.avatar;
			state.user.email = payload.email;
			state.user.id = payload.id;

			// state.token.accessToken = payload.accessToken;
			// state.token.accessTokenExpiry = payload.accessTokenExpiry;

			state.registration.loading = false;
			state.registration.success = true;

			return state;
		},
		// Reset Password Request (Step One)
		resetPasswordRequest: ({ passwordReset }, _payload) => {
			delete passwordReset.success;
			passwordReset.loading = true;
		},
		resetPasswordFailure: ({ passwordReset }, { payload }) => {
			passwordReset.loading = false;
			passwordReset.error = payload;
		},
		resetPasswordSuccess: ({ passwordReset }) => {
			passwordReset.loading = false;
			passwordReset.success = true;
		},
		// Reset Password Token Validation (Step Two)
		passwordResetTokenValidationRequest: ({ passwordResetTokenValidation }, _payload) => {
			delete passwordResetTokenValidation.success;
			passwordResetTokenValidation.loading = true;
		},
		passwordResetTokenValidationFailure: ({ passwordResetTokenValidation }, { payload }) => {
			passwordResetTokenValidation.loading = false;
			passwordResetTokenValidation.error = payload;
		},
		passwordResetTokenValidationSuccess: ({ passwordResetTokenValidation }, { payload }) => {
			passwordResetTokenValidation.loading = false;
			passwordResetTokenValidation.success = true;
			passwordResetTokenValidation.data = payload;
		},
		passwordResetReplacementRequest: ({ passwordResetReplacement }, _payload) => {
			delete passwordResetReplacement.success;
			passwordResetReplacement.loading = true;
		},
		passwordResetReplacementFailure: ({ passwordResetReplacement }, { payload }) => {
			passwordResetReplacement.loading = false;
			passwordResetReplacement.error = payload;
		},
		passwordResetReplacementSuccess: ({ passwordResetReplacement }) => {
			passwordResetReplacement.loading = false;
			passwordResetReplacement.success = true;
		},
	},
});

export default authSlice;
