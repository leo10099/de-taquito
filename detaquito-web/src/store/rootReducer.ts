import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import Auth from 'features/Auth/Auth.reducer';
import Connection from 'features/Connection/Connection.reducer';
import Layout from 'features/Layout/Layout.reducer';

const rootReducer = combineReducers({
	auth: Auth.reducer,
	connection: Connection.reducer,
	layout: Layout.reducer,
});

export default rootReducer;
