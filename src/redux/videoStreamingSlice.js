import { createSlice } from "@reduxjs/toolkit";
import Videos from "../components/videoPlayer/Videos.json";

export const videoStreamingSlice = createSlice({
	name: "videoStreaming",
	initialState: {
		videos: Videos,
	},
	reducers: {
		setVideoData: (state, action) => {
			state.videos.forEach((video) => {
				if (video.id === action.payload.id) {
					video = action.payload;
				}
			});
		},
	},
});

export const updateVideoData = (video) => (dispatch) => {
	dispatch(setVideoData({ payload: video }));
};

export const { setVideoData } = videoStreamingSlice.actions;
export default videoStreamingSlice.reducer;
