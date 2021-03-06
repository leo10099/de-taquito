import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationPayload = {
	text: string;
	type: "error" | "info" | "success";
};

export default createSlice({
	name: "notification",
	initialState: {
		alertType: "",
		alertText: "",
		isOpen: false,
	},
	reducers: {
		openAlert: (state, { payload }: PayloadAction<NotificationPayload>) => {
			state.alertText = payload.text;
			state.alertType = payload.type;
			state.isOpen = true;
			return state;
		},
		closeAlert: state => {
			state.alertText = "";
			state.alertType = "";
			state.isOpen = false;
			return state;
		},
	},
});
