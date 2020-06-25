import { all } from 'redux-saga/effects';

import AuthSagas from 'features/Auth/Auth.sagas';
import ConnectionSagas from 'features/Connection/Connection.sagas';

export default function* rootSaga() {
	yield all([...AuthSagas, ...ConnectionSagas]);
}
