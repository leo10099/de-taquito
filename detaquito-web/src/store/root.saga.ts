import { all, AllEffect } from "redux-saga/effects";

import ConnectionSagas from "features/Connection/Connection.sagas";
import AuthSagas from "features/Auth/Auth.sagas";

export default function* rootSaga(): Generator<AllEffect<any>, void, unknown> {
	yield all([...ConnectionSagas, ...AuthSagas]);
}
