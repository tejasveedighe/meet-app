import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import JoinScreen from "./components/JoinScreen/Join";
import MeetingView from "./components/Meeting/MeetingView";
import { useJwt } from "react-jwt";

const App = () => {
	const { meetingId, username, token } = useSelector((state) => state.meeting);

	// const { decodedToken } = useJwt(token);
	// console.log(decodedToken.permissions);
	return token && meetingId && username ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: false,
				webcamEnabled: false,
				name: username,
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
