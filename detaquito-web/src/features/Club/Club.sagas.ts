// Redux Sagas
import { takeLatest, put } from "redux-saga/effects";

// Config
import { Api } from "config/api";

// Slice
import Club from "./Club.reducer";

const { actions } = Club;

function* getAllActiveClubs() {
	const { data, response } = yield Api.get("/club/active");
	if (!data || (response && response.status !== 200)) {
		return yield put(actions.getAllCompetitionClubsError(response.statusText));
	}
	return yield put(actions.getAllCompetitionClubsSuccess(data));
}

export default [takeLatest(actions.getAllCompetitionClubsRequest, getAllActiveClubs)];
