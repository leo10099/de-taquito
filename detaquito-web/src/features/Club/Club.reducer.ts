import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Club } from "./Club.types";

interface ActiveClubsPayload {
	[key: string]: Club[];
}

interface ClubSlice {
	activeClubs: ActiveClubsPayload;
	activeClubsLoading: boolean;
	activeClubsError: string | null;
}
const initialState: ClubSlice = {
	activeClubs: {},
	activeClubsLoading: true,
	activeClubsError: null,
};

export default createSlice({
	name: "club",
	initialState,
	reducers: {
		// Get Clubs
		getAllCompetitionClubsRequest: state => {
			state.activeClubsLoading = true;
			return state;
		},
		getAllCompetitionClubsError: (state, { payload }: PayloadAction<any>) => {
			state.activeClubsLoading = false;
			state.activeClubsError = payload;
			return state;
		},
		getAllCompetitionClubsSuccess: (state, { payload }: PayloadAction<ActiveClubsPayload>) => {
			state.activeClubs = payload;
			state.activeClubsLoading = false;
			state.activeClubsError = null;
			return state;
		},
	},
});
