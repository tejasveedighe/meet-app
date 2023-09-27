import { createSlice } from "@reduxjs/toolkit";
import { authToken, createMeeting } from "../api";

export const meetingSlice = createSlice({
	name: "meeting",
	initialState: {
		meetingId: null,
		username: null,
		token: null,
	},
	reducers: {
		setMeetingId: (state, action) => {
			state.meetingId = action.payload;
		},
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const getMeetingAndToken = (id) => async (dispatch, getState) => {
	const { token } = getState().meeting;
	const meetingId = id === null ? await createMeeting({ token: token }) : id;

	dispatch(setMeetingId(meetingId));
};

export const { setMeetingId, setUsername, setToken } = meetingSlice.actions;

export default meetingSlice.reducer;
