/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ConnectionStatus {
	up = 'up',
	down = 'down',
	slow = 'slow',
}

export default createSlice({
	name: 'connection',
	initialState: {
		status: ConnectionStatus.up,
	},
	reducers: {
		setConnectionState: (state, { payload }: PayloadAction<ConnectionStatus>) => {
			return state;
		},
	},
});
