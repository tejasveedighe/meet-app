import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import MicOnBlack from "./assets/microphone-svgrepo-com.svg";
import MicOnWhite from "./assets/microphone-svgrepo-com (2).svg";
import MicOffWhite from "./assets/microphone-mute-record-song-sound-voice-svgrepo-com (1).svg";
import MicOffBlack from "./assets/microphone-mute-record-song-sound-voice-svgrepo-com.svg";
import styles from "./Participant.module.css";

export default function ParticipantView(props) {
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

	return (
		<div className={styles.parent}>
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
						borderRadius: "5px",
					}}
				>
					{displayName}
				</div>
			)}
			{micOn ? (
				<img
					src={webcamOn ? MicOnBlack : MicOnWhite}
					alt="Mic On"
					className={styles.mic}
				/>
			) : (
				<img
					src={webcamOn ? MicOffBlack : MicOffWhite}
					alt="Mic Off"
					className={styles.mic}
				/>
			)}
		</div>
	);
}
