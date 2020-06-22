// Config
import { Api, updateAccessTokenInCommonHeaders } from 'config/api';

// Redux Sagas
import { put, takeLatest } from 'redux-saga/effects';

// Auth Slice
import Auth from './Auth.reducer';

// Types
import { BaseAction } from 'typings';

// Helpers
import { serverNotResponding } from 'utils';

const { actions } = Auth;

// Token management
function* tryRefreshToken() {
	const response = yield Api('/auth/refresh', {
		method: 'POST',
	}).catch(e => e.response);

	if (response?.status !== 201) {
		return false;
	}
	const {
		accessToken,
		accessTokenExpiryInSeconds,
	}: {
		accessToken: string;
		accessTokenExpiryInSeconds: number;
	} = response.data;

	yield updateAccessTokenInCommonHeaders(accessToken);

	const accessTokenExpiry = accessTokenExpiryInSeconds * 1000;

	return yield put(
		actions.setAccessToken({
			accessToken,
			accessTokenExpiry,
		})
	);
}

// Login
function* tryLogIn({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api('auth/local/login', {
			method: 'POST',
			data: payload,
		});

		if (!data) {
			if (response?.data) {
				return yield put(actions.registrationFailure(response.data));
			}
			// TODO --> Handle this globally adding general app level alert
			return yield put(actions.registrationFailure(serverNotResponding));
		}

		return yield put(actions.loginSuccess(data));
	} catch (e) {
		return yield put(actions.loginFailure(e));
	}
}

// Registration
function* trySignUp({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api('auth/local/register', {
			method: 'POST',
			data: payload,
		});

		if (!data) {
			if (response?.data) {
				return yield put(actions.registrationFailure(response.data));
			}
			// TODO --> Handle this globally adding general app level alert
			return yield put(actions.registrationFailure(serverNotResponding));
		}

		return yield put(actions.registrationSuccess(data));
	} catch (e) {
		return yield put(actions.registrationFailure(e));
	}
}

export default [
	takeLatest(actions.tryRefreshToken, tryRefreshToken),
	takeLatest(actions.loginRequest, tryLogIn),
	takeLatest(actions.registrationRequest, trySignUp),
];
