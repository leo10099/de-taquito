import { all } from "redux-saga/effects";

import ConnectionSagas from "features/Connection/Connection.sagas";
import AuthSagas from "features/Auth/Auth.sagas";

export default function* rootSaga() {
	yield all([...ConnectionSagas, ...AuthSagas]);
}
