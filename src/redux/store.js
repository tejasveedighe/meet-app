import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./meetingSlice";
import videoStreamingReducer from "./videoStreamingSlice";

export default configureStore({
	reducer: {
		meeting: meetingReducer,
		video: videoStreamingReducer,
	},
});
