// Config
import { Api, updateAccessTokenInCommonHeaders } from "config/api";

// Redux Sagas
import { put, takeLatest } from "redux-saga/effects";

// Auth Slice
import Auth from "./Auth.reducer";

// Errors
import { invalidToken } from "utils/errorMessages";

// Types
import { BaseAction } from "store";

// Helpers
import { serverNotResponding } from "utils/errorMessages";

const { actions } = Auth;

// Token management
function* tryRefreshToken() {
	const response = yield Api("/auth/refresh", {
		method: "POST",
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

	yield put(
		actions.setAccessToken({
			accessToken,
			accessTokenExpiry,
		})
	);

	return yield put(actions.setUserInfoFromCookie(response.data));
}

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

		const {
			accessToken,
		}: {
			accessToken: string;
			accessTokenExpiryInSeconds: number;
		} = data;

		yield updateAccessTokenInCommonHeaders(accessToken);
		return yield put(actions.loginSuccess(data));
	} catch (e) {
		return yield put(actions.loginFailure(e.message));
	}
}

// Reset Password Request (Step One)
function* tryResetPassword({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api("auth/forgot", {
			method: "POST",
			data: payload,
		});

		if (!data) {
			if (response?.data) {
				return yield put(actions.resetPasswordFailure(response.data));
			}
			return yield put(actions.resetPasswordFailure(serverNotResponding));
		}

		return yield put(actions.resetPasswordSuccess());
	} catch (e) {
		return yield put(actions.resetPasswordFailure(e));
	}
}

// Reset Password Token Validation (Step Two)
function* checkResetToken({ payload }: BaseAction) {
	try {
		const { data, response } = yield Api(`/user/existing?resetToken=${payload}`);

		if (!data) {
			if (response?.data) {
				return yield put(actions.passwordResetTokenValidationFailure(response.data));
			}
			return yield put(actions.passwordResetTokenValidationFailure(serverNotResponding));
		}

		if (data.response?.statusCode === 404) {
			return yield put(actions.passwordResetTokenValidationFailure(invalidToken));
		}

		return yield put(actions.passwordResetTokenValidationSuccess(data));
	} catch (e) {
		return yield put(actions.passwordResetTokenValidationFailure(e));
	}
}

function* replaceForgottenPassword({ payload }: BaseAction) {
	try {
		const { status, response } = yield Api(`/auth/forgot/replace`, {
			method: "POST",
			data: payload,
		});

		if (status !== 201) {
			return yield put(actions.passwordResetReplacementFailure(response?.data ?? ""));
		}

		return yield put(actions.passwordResetReplacementSuccess());
	} catch (e) {
		return yield put(actions.passwordResetReplacementFailure(e));
	}
}

function* tryLogout({ payload }: BaseAction) {
	try {
		const { status } = yield Api(`/auth/logout`, {
			method: "POST",
			data: payload,
		});

		if (status !== 200) {
			return yield put(actions.logoutFailure());
		}

		return yield put(actions.logoutSuccess());
	} catch (e) {
		return yield put(actions.logoutFailure());
	}
}

export default [
	takeLatest(actions.tryRefreshToken, tryRefreshToken),
	takeLatest(actions.registrationRequest, trySignUp),
	takeLatest(actions.loginRequest, tryLogIn),
	takeLatest(actions.resetPasswordRequest, tryResetPassword),
	takeLatest(actions.passwordResetTokenValidationRequest, checkResetToken),
	takeLatest(actions.passwordResetReplacementRequest, replaceForgottenPassword),
	takeLatest(actions.logoutRequest, tryLogout),
];
