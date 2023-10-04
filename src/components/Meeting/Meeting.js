import React from "react";
import MeetingView from "../MeetingView/MeetingView";
import JoinScreen from "../JoinScreen/Join";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useSelector } from "react-redux";

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
		<JoinScreen />
	);
}
