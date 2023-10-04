import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function HLSPlayer() {
	const { hlsUrls, hlsState } = useMeeting();
	const playerRef = useRef(null);

	useEffect(() => {
		if (
			hlsUrls.downstreamUrl &&
			hlsState === Constants.hlsEvents.HLS_PLAYABLE
		) {
			if (Hls.isSupported()) {
				const hls = new Hls({
					capLevelToPlayerSize: true,
					maxLoadingDelay: 4,
					minAutoBitrate: 0,
					autoStartLoad: true,
					defaultAudioCodec: "mp4a.40.2",
				});

				let player = document.querySelector("#hlsPlayer");

				hls.loadSource(hlsUrls.downstreamUrl);
				hls.attachMedia(player);
			} else {
				if (typeof playerRef.current?.play === "function") {
					playerRef.current.src = hlsUrls.downstreamUrl;
					playerRef.current.play();
				}
			}
		}
	}, [hlsUrls, hlsState]);
	return (
		<div>
			{hlsState !== "HLS_PLAYABLE" ? (
				<div>
					<p>HLS has not started yet or is stopped</p>
				</div>
			) : (
				<div>
					<video
						ref={playerRef}
						id="hlsPlayer"
						autoPlay={true}
						controls
						style={{ width: "100%", height: "100%" }}
						playsInline
						muted={false}
						playing
						onError={(err) => {
							console.log(err, "hls video error");
						}}
					></video>
				</div>
			)}
		</div>
	);
}
