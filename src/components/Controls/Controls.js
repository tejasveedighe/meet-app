import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";

export default function Controls() {
	const { leave, toggleMic, toggleWebcam } = useMeeting();
	return (
		<div>
			<button onClick={() => leave()}>Leave</button>
			<button onClick={() => toggleMic()}>toggleMic</button>
			<button onClick={() => toggleWebcam()}>toggleWebcam</button>
		</div>
	);
}
