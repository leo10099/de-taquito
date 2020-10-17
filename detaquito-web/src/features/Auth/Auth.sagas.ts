// Config
import { Api } from "config/api";

// Redux Sagas
import { put, takeLatest } from "redux-saga/effects";

// Auth Slice
import Auth from "./Auth.reducer";

// Types
import { BaseAction } from "store";

// Helpers
import { serverNotResponding } from "utils/errorMessages";

const { actions } = Auth;

// Registration
function* trySignUp({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api("auth/local/register", {
			method: "POST",
			data: payload,
		});

		if (!data) {
			if (response?.data) {
				return yield put(actions.registrationFailure(response.data));
			}
			return yield put(actions.registrationFailure(serverNotResponding));
		}

		return yield put(actions.registrationSuccess(data));
	} catch (e) {
		return yield put(actions.registrationFailure(e));
	}
}

// Login
function* tryLogIn({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api("auth/local/login", {
			method: "POST",
			data: payload,
		});

		if (!data) {
			if (response?.data) {
				return yield put(actions.loginFailure(response.data));
			}
			return yield put(actions.loginFailure(serverNotResponding));
		}

		return yield put(actions.loginSuccess(data));
	} catch (e) {
		return yield put(actions.loginFailure(e));
	}
}

export default [
	takeLatest(actions.registrationRequest, trySignUp),
	takeLatest(actions.loginRequest, tryLogIn),
];
