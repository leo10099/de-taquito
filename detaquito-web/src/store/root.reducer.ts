import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import Auth from "features/Auth/Auth.reducer";
import Connection from "features/Connection/Connection.reducer";

const rootReducer = combineReducers({
	auth: Auth.reducer,
	connection: Connection.reducer,
});

export default rootReducer;
