import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import JoinMeetingScreen from "../JoinScreens/JoinMeetingScreen";
import MeetingView from "../MeetingView/MeetingView";

export default function Meeting() {
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
		<JoinMeetingScreen />
	);
}
