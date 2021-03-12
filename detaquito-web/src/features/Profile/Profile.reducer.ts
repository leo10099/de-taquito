import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Typings
import { StoreSliceAction } from "store";

const initialState = {
	update: {
		error: null,
		loading: false,
	} as StoreSliceAction,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		// Update profile and settings
		profileUpdateRequest: (state, { payload }: PayloadAction<any>) => {
			state.update.error = null;
			state.update.loading = true;
		},
		profileUpdateFailure: (state, { payload }: PayloadAction<any>) => {
			state.update.loading = false;
			state.update.error = payload;
		},
		profileUpdateSuccess: state => {
			state.update.loading = false;
			state.update.error = null;
		},
	},
});

export default profileSlice;
