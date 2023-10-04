import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useCallback, useEffect } from "react";
import HLSPlayer from "../HlsPlayer/HlsPlayer";

const config = {
	// Layout Configuration
	layout: {
		type: "SPOTLIGHT", // "SPOTLIGHT" | "SIDEBAR",  Default : "GRID"
		priority: "SPEAKER", // "PIN", Default : "SPEAKER"
		gridSize: 4, // MAX : 25
	},

	// Theme of interactive livestream layout
	theme: "DARK", //  "LIGHT" | "DEFAULT"

	// `mode` is used to either interactive livestream video & audio both or only audio.
	mode: "video-and-audio", // "audio", Default : "video-and-audio"

	// Quality of interactive livestream and is only applicable to `video-and-audio` type mode.
	quality: "high", // "low" | "med",  Default : "med"

	// This mode refers to orientation of interactive livestream.
	// landscape : Start interactive livestream of the meeting in horizontally
	// portrait : Start interactive livestream of the meeting in vertically (Best for mobile view)
	orientation: "landscape", // "portrait",  Default : "landscape"
};

export default function Container() {
	const { startHls, stopHls, hlsState } = useMeeting();
	useEffect(() => {
		startHls(config);
	}, [startHls]);
	const handleToggleHls = useCallback(() => {}, []);
	console.log(hlsState);
	return (
		<div className="w-full h-full">
			<button onClick={handleToggleHls}>Toggle HLS</button>
			<HLSPlayer />
		</div>
	);
}
