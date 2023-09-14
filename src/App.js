import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import MeetingView from "./components/Meeting/MeetingView";
import { authToken, createMeeting } from "./api";
import JoinScreen from "./components/JoinScreen/Join";

const App = () => {
	const [meetingId, setMeetingId] = useState(null);

	// get the metting id from the api
	const getMeetingAndToken = async (id) => {
		const meetingId =
			id === null ? await createMeeting({ token: authToken }) : id;

		setMeetingId(meetingId);
	};

	const onMeetingLeave = () => {
		setMeetingId(null);
	};

	return authToken && meetingId ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: true,
				webcamEnabled: true,
				name: "Tejasvee",
			}}
			token={authToken}
		>
			<MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
		</MeetingProvider>
	) : (
		<JoinScreen getMeetingAndToken={getMeetingAndToken} />
	);
};

export default App;
