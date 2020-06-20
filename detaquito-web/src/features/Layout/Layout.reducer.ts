import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export default createSlice({
	name: 'layout',
	initialState: {
		theme: '',
	},
	reducers: {
		setTheme: (state, { payload }: PayloadAction<string>) => {
			state.theme = payload;
		},
	},
});
