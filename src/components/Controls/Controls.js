import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";

export default function Controls() {
	const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
	return (
		<div>
			<button onClick={() => leave()}>Leave</button>
			<button onClick={() => toggleMic()}>toggleMic</button>
			<button onClick={() => toggleWebcam()}>toggleWebcam</button>
			<button onClick={() => toggleScreenShare()}>toggleScreenShare</button>
		</div>
	);
}
