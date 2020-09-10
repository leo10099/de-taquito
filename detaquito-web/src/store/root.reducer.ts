import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import Connection from "features/Connection/Connection.reducer";

const rootReducer = combineReducers({
	connection: Connection.reducer,
});

export default rootReducer;
