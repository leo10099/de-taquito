import { all } from 'redux-saga/effects';

import AuthSagas from 'features/Auth/Auth.sagas';

export default function* rootSaga() {
	yield all([...AuthSagas]);
}
