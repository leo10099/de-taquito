/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export default createSlice({
	name: 'notification',
	initialState: {
		alertType: '',
		alertText: '',
		isOpen: false,
	},
	reducers: {
		openAlert: (state, { payload }: PayloadAction<any>) => {
			state.alertText = payload.text;
			state.alertType = payload.type;
			state.isOpen = true;
			return state;
		},
		closeAlert: state => {
			state.alertText = '';
			state.alertType = '';
			state.isOpen = false;
			return state;
		},
	},
});
