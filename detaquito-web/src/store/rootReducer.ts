import { combineReducers } from '@reduxjs/toolkit';

// Reducers
import Layout from 'features/Layout/Layout.reducer';
import Auth from 'features/Auth/Auth.reducer';

const rootReducer = combineReducers({
	layout: Layout.reducer,
	auth: Auth.reducer,
});

export default rootReducer;
