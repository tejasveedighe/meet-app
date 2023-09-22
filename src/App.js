import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import { authToken } from "./api";
import JoinScreen from "./components/JoinScreen/Join";
import MeetingView from "./components/Meeting/MeetingView";

const App = () => {
	const { meetingId, username } = useSelector((state) => state.meeting);

	return authToken && meetingId && username ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: false,
				webcamEnabled: false,
				name: username,
			}}
			token={authToken}
		>
			<MeetingView meetingId={meetingId} />
		</MeetingProvider>
	) : (
		<JoinScreen />
	);
};

export default App;
