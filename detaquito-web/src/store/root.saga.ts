import { all, AllEffect } from "redux-saga/effects";

import ConnectionSagas from "features/Connection/Connection.sagas";
import AuthSagas from "features/Auth/Auth.sagas";
import ClubSagas from "features/Club/Club.sagas";
import ProfileSagas from "features/Profile/Profile.sagas";

export default function* rootSaga(): Generator<AllEffect<any>, void, unknown> {
	yield all([...ConnectionSagas, ...AuthSagas, ...ClubSagas, ...ProfileSagas]);
}
