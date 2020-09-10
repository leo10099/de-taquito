import { all } from "redux-saga/effects";

import ConnectionSagas from "features/Connection/Connection.sagas";

export default function* rootSaga() {
	yield all([...ConnectionSagas]);
}
