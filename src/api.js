import axios from "axios";
//Auth token we will use to generate a meeting and connect to it
export const authToken = process.env.REACT_APP_VIDEO_SDK_TOKEN;

// API call to create meeting
export const createMeeting = async ({ token }) => {
	try {
		const response = await axios.post(
			"https://api.videosdk.live/v2/rooms",
			{},
			{
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		const { roomId } = response.data;
		return roomId;
	} catch (error) {
		console.error(error);
	}
};

// get authToken for each user based on if creator of meeting or participant
export const getAuthToken = async ({ mod }) => {
	try {
		const response = await axios.post(
			"http://localhost:3001/get-token",
			{
				mod,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const { authToken } = response.data;
		return authToken;
	} catch (error) {
		console.error(error);
	}
};
