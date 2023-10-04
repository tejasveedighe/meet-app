import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import JoinLivestreamScreen from "../JoinScreens/JoinLivestreamScreen";

export default function Livestream() {
	const { meetingId, username, token } = useSelector((store) => store.meeting);
	return meetingId && username && token ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: true,
				webcamEnabled: true,
				name: username,
			}}
			token={token}
			joinWithoutUserInteraction
		></MeetingProvider>
	) : (
		<JoinLivestreamScreen />
	);
}
