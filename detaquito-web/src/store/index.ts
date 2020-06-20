import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Root Reducer
import rootReducer from './rootReducer';

// Redux Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
	devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

//Hot module replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
