import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import JoinScreen from "./components/JoinScreen/Join";
import MeetingView from "./components/Meeting/MeetingView";

const App = () => {
	const { meetingId, username, token } = useSelector((store) => store.meeting);

	return token && meetingId && username ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: false,
				webcamEnabled: false,
				name: username,
				multiStream: true,
				mode: "CONFERENCE",
			}}
			token={token}
		>
			<MeetingView meetingId={meetingId} />
		</MeetingProvider>
	) : (
		<JoinScreen />
	);
};

export default App;
