/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// JWT
import { decode } from 'jsonwebtoken';

// Typings
import { StoreSliceAction, DecodedUserToken } from 'typings';

// Action Types
export type SetAccessTokenPayload = { accessToken: string; accessTokenExpiry?: number };
export type LoginPayload = { email: string; secret: string };
export type RegistrationPayload = { email: string; alias: string; secret: string };
export type UserPayload = { alias: string; avatar: string; email: string; sub: number };

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: {
			accessToken: '',
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
			alias: '',
			avatar: '',
			email: '',
			id: -1,
		},
	},
	reducers: {
		// Token management
		tryRefreshToken: state => state,
		setAccessToken: (state, { payload }: PayloadAction<SetAccessTokenPayload>) => {
			state.token.accessToken = payload.accessToken;
			state.token.accessTokenExpiry = payload.accessTokenExpiry;
			return state;
		},
		// User Session
		setUserInfo: (state, { payload }) => {
			const { alias, avatar, email, sub }: DecodedUserToken = payload;

			state.user.id = parseInt(sub);
			state.user.alias = alias;
			state.user.avatar = avatar;
			state.user.email = email;
			return state;
		},
		// Login
		loginRequest: ({ login }, { payload }: PayloadAction<LoginPayload>) => {
			delete login.success;
			login.loading = true;
		},
		loginFailure: ({ login }, { payload }) => {
			login.loading = false;
			login.error = payload;
		},
		loginSuccess: (state, { payload }) => {
			const decodedToken = decode(payload.accessToken) as DecodedUserToken;
			state.user.alias = decodedToken.alias;
			state.user.avatar = decodedToken.avatar;
			state.user.email = decodedToken.email;
			state.user.id = parseInt(decodedToken.sub);

			// state.token.accessToken = payload.accessToken;
			// state.token.accessTokenExpiry = payload.accessTokenExpiry;

			state.login.loading = false;
			state.login.success = true;
		},
		// Registration
		registrationRequest: ({ registration }, { payload }: PayloadAction<RegistrationPayload>) => {
			delete registration.success;
			registration.loading = true;
		},
		registrationFailure: ({ registration }, { payload }) => {
			registration.loading = false;
			registration.error = payload;
		},
		registrationSuccess: (state, { payload }) => {
			const decodedToken = decode(payload.accessToken) as DecodedUserToken;
			state.user.alias = decodedToken.alias;
			state.user.avatar = decodedToken.avatar;
			state.user.email = decodedToken.email;
			state.user.id = parseInt(decodedToken.sub);

			// state.token.accessToken = payload.accessToken;
			// state.token.accessTokenExpiry = payload.accessTokenExpiry;

			state.registration.loading = false;
			state.registration.success = true;

			return state;
		},
	},
});

export default authSlice;