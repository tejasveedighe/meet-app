import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import styles from "./Participant.module.css";
import MicIcons from "./components/MicIcons/MicIcons";
import NoCamScreen from "./components/NoCamScreen/NoCamScreen";

export default function ParticipantView(props) {
	const micRef = useRef(null);
	const {
		webcamStream,
		micStream,
		webcamOn,
		micOn,
		isLocal,
		displayName,
		screenShareOn,
		screenShareStream,
	} = useParticipant(props.participantId);
	console.log(
		webcamStream,
		micStream,
		webcamOn,
		micOn,
		isLocal,
		displayName,
		screenShareOn,
		screenShareStream
	);

	const videoStream = useMemo(() => {
		if (webcamOn && webcamStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(webcamStream.track);
			return mediaStream;
		}
	}, [webcamOn, webcamStream]);

	const mediaStream = useMemo(() => {
		if (screenShareOn && screenShareStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(screenShareStream.track);
			return mediaStream;
		}
	}, [screenShareStream, screenShareOn]);

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
				<NoCamScreen displayName={displayName} />
			)}
			<MicIcons webcamOn={webcamOn} micOn={micOn} />
			{screenShareOn ? (
				<ReactPlayer
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					url={mediaStream}
					height={"200px"}
					width={"300px"}
					onError={(err) => {
						console.log(err, "participant video error");
					}}
				/>
			) : null}
		</div>
	);
}
