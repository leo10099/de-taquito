import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// Root Reducer
import rootReducer from "./root.reducer";

// Redux Sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
	devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type BaseAction = {
	type: string;
	payload?: any;
};
export type StoreSliceAction = {
	data?: any;
	loading: boolean;
	error: any;
	success?: boolean;
};

export default store;
