import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ConnectionStatus {
	up = "up",
	down = "down",
	slow = "slow",
}

export default createSlice({
	name: "connection",
	initialState: {
		status: ConnectionStatus.up,
	},
	reducers: {
		setConnectionState: (state, _payload: PayloadAction<ConnectionStatus>) => {
			console.log("[setConnectionState]", _payload);
			return state;
		},
	},
});
