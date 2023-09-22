//Auth token we will use to generate a meeting and connect to it
export const authToken = process.env.REACT_APP_VIDEO_SDK_TOKEN;
// API call to create meeting
export const createMeeting = async ({ token }) => {
	const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
		method: "POST",
		headers: {
			authorization: `${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	});
	//Destructuring the roomId from the response
	const { roomId } = await res.json();
	return roomId;
};
