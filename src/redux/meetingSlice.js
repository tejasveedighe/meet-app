import { createSlice } from "@reduxjs/toolkit";
import { createMeeting, getAuthToken } from "../api";

export const meetingSlice = createSlice({
	name: "meeting",
	initialState: {
		meetingId: null,
		username: null,
		token: null,
		moderator: false,
		mode: null,
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
		setModerator: (state, action) => {
			state.moderator = action.payload;
		},
		setMode: (state, action) => {
			state.mode = action.payload;
		},
	},
});

export const getMeetingAndToken = (id) => async (dispatch, getState) => {
	const { token } = getState().meeting;
	const meetingId = id === null ? await createMeeting({ token: token }) : id;

	dispatch(setMeetingId(meetingId));
};

export const getToken = (mod) => async (dispatch) => {
	await getAuthToken({ mod: mod }).then((authToken) => {
		dispatch(setToken(authToken));
		dispatch(setModerator(mod));
	});
};

export const { setMeetingId, setUsername, setToken, setModerator, setMode } =
	meetingSlice.actions;

export default meetingSlice.reducer;
