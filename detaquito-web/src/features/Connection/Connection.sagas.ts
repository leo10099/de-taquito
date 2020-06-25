// Redux Sagas
import { takeLatest } from 'redux-saga/effects';

// Slice
import Connection, { ConnectionStatus } from './Connection.reducer';

// Types
import { BaseAction } from 'typings';

const { actions } = Connection;

function* connectionFailure({ payload }: BaseAction) {
	if (payload === ConnectionStatus.down) {
		// Show global error alert here
		yield window.alert('Connection went down!');
	}
}

export default [takeLatest(actions.setConnectionState, connectionFailure)];
