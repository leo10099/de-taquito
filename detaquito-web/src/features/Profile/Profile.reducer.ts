import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Typings
import { StoreSliceAction } from "store";

const initialState = {
	profile: {
		update: {
			error: null,
			loading: false,
		} as StoreSliceAction,
	},
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		// Update profile and settings
		profileUpdateRequest: (state, { payload }: PayloadAction<any>) => {
			state.profile.update.error = null;
			state.profile.update.loading = true;
		},
		profileUpdateFailure: (state, { payload }: PayloadAction<any>) => {
			state.profile.update.loading = false;
			state.profile.update.error = payload;
		},
		profileUpdateSuccess: state => {
			state.profile.update.loading = false;
			state.profile.update.error = null;
		},
	},
});

export default profileSlice;
