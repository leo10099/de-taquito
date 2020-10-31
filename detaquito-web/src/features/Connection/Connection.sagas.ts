// Redux Sagas
import { takeLatest, put } from "redux-saga/effects";

// Slice
import Connection, { ConnectionStatus } from "./Connection.reducer";
import Notification from "features/Notification/Notification.reducer";

// Types
import { BaseAction } from "store";

const { actions } = Connection;

function* connectionFailure({ payload }: BaseAction) {
	if (payload === ConnectionStatus.down) {
		yield put(
			Notification.actions.openAlert({
				text: "Hubo un error de conexión. ¿Tienes acceso a internet?",
				type: "error",
			})
		);
		yield put({
			type: "CONNECTION_FAILURE",
		});
	}
}

export default [takeLatest(actions.setConnectionState, connectionFailure)];
