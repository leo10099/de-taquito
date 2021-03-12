// Redux Sagas
import { takeLatest, put } from "redux-saga/effects";

// Config
import { Api } from "config/api";

// Slice
import Profile from "./Profile.reducer";
import Notification from "../Notification/Notification.reducer";
import Auth from "../Auth/Auth.reducer";

const { actions } = Profile;

function* patchProfile(action: any) {
	const { response } = yield Api.patch("/user", action.payload);

	if (response && response.status !== 200) {
		yield put(
			Notification.actions.openAlert({
				text: "Hubo un error al intentar actualizar tu perfil",
				type: "error",
			})
		);
		return yield put(actions.profileUpdateFailure(response.statusText));
	}
	yield put(
		Notification.actions.openAlert({
			text: "Se actualizó tu perfil 👍",
			type: "success",
		})
	);
	yield put(Auth.actions.tryRefreshToken());
	return yield put(actions.profileUpdateSuccess());
}

export default [takeLatest(actions.profileUpdateRequest, patchProfile)];
