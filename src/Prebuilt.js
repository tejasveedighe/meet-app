import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useSelector } from "react-redux";

export default function PrebuiltApp() {
	const { meetingId, username } = useSelector((state) => state.meeting);
	useEffect(() => {
		const config = {
			name: username,
			meetingId: meetingId,
			apiKey: process.env.REACT_APP_VIDEO_SDK_TOKEN,

			containerId: null,

			micEnabled: true,
			webcamEnabled: true,
			participantCanToggleSelfWebcam: true,
			participantCanToggleSelfMic: true,

			chatEnabled: true,
			screenShareEnabled: true,

			/*

     Other Feature Properties
      
      */
		};

		const meeting = new VideoSDKMeeting();
		meeting.init(config);
	}, [meetingId, username]);

	return <div></div>;
}
