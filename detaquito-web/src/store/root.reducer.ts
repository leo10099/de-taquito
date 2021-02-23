import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import Auth from "features/Auth/Auth.reducer";
import Connection from "features/Connection/Connection.reducer";
import Notification from "features/Notification/Notification.reducer";
import Club from "features/Club/Club.reducer";

const rootReducer = combineReducers({
	auth: Auth.reducer,
	connection: Connection.reducer,
	notification: Notification.reducer,
	club: Club.reducer,
});

export default rootReducer;
