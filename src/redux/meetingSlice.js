import { createSlice } from "@reduxjs/toolkit";
import { authToken, createMeeting } from "../api";

export const meetingSlice = createSlice({
	name: "meeting",
	initialState: {
		meetingId: null,
		username: null,
	},
	reducers: {
		setMeetingId: (state, action) => {
			state.meetingId = action.payload;
		},
		setUsername: (state, action) => {
			state.username = action.payload;
		},
	},
});

export const getMeetingAndToken = (id) => async (dispatch) => {
	const meetingId =
		id === null ? await createMeeting({ token: authToken }) : id;

	dispatch(setMeetingId(meetingId));
};


export const { setMeetingId, setUsername } = meetingSlice.actions;

export default meetingSlice.reducer;
