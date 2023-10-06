import { createSlice } from "@reduxjs/toolkit";

export const videoStreamingSlice = createSlice({
	name: "video",
	initialState: {
		videos: [
			{
				id: "1",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},

			{
				id: "2",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},
			{
				id: "3",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},
			{
				id: "4",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},
			{
				id: "5",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},
			{
				id: "6",
				url: "https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4",
				title: "Shinchan Video",
				progress: { time: [0, 0], sec: 0 },
			},
		],
	},
	reducers: {
		setVideoData: (state, action) => {
			const updatedVideos = state.videos.map((video) => {
				if (video.id === action.payload.id) {
					return action.payload; // Replace the video with the updated payload
				}
				return video; // Keep other videos as they are
			});
			console.log(action, updatedVideos);

			state.videos = updatedVideos; // Update the state with the updated array
		},
	},
});

export const { setVideoData } = videoStreamingSlice.actions;
export default videoStreamingSlice.reducer;