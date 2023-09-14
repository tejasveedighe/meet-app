import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function ParticipantView(props) {
	const [cam, setCam] = useState(false);
	const micRef = useRef(null);
	const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
		useParticipant(props.participantId);
	const videoStream = useMemo(() => {
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(webcamStream.track);
			return mediaStream;
		}
	}, [webcamStream, webcamOn]);

	const { toggleWebcam } = useMeeting();
	useEffect(() => {
		if (micRef.current) {
			if (micOn && micStream) {
				const mediaStream = new MediaStream();
				mediaStream.addTrack(micStream.track);

				micRef.current.srcObject = mediaStream;
				micRef.current
					.play()
					.catch((error) =>
						console.error("videoElem.current.play() failed", error)
					);
			} else {
				micRef.current.srcObject = null;
			}
		}
	}, [micOn, micStream]);

	function handleWebCam() {
		toggleWebcam();
		setCam((prev) => !prev);
	}
	return (
		<div>
			<audio ref={micRef} autoPlay playsInline muted={isLocal} />
			{webcamOn ? (
				<ReactPlayer
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					url={videoStream}
					height={"200px"}
					width={"300px"}
					onError={(err) => {
						console.log(err, "participant video error");
					}}
				/>
			) : (
				<div
					style={{
						width: "300px",
						height: "200px",
						border: "1px solid black",
						background: "black",
						color: "white",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Tejasvee
				</div>
			)}
			<button onClick={handleWebCam}>
				{cam ? "Enable" : "Disable"} Web Cam
			</button>
		</div>
	);
}
