import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import styles from "./ScreenShare.module.css";

export default function ScreenShare(props) {
	const {
		isLocal,
		screenShareOn,
		screenShareStream,
		screenShareAudioStream,
		participant,
	} = useParticipant(props.participantId);

	const audioPlayer = useRef();

	const mediaStream = useMemo(() => {
		if (screenShareOn && screenShareStream) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(screenShareStream.track);
			return mediaStream;
		}
	}, [screenShareStream, screenShareOn]);

	useEffect(() => {
		if (
			!isLocal &&
			audioPlayer.current &&
			screenShareOn &&
			screenShareAudioStream
		) {
			const mediaStream = new MediaStream();
			mediaStream.addTrack(screenShareAudioStream.track);

			audioPlayer.current.srcObject = mediaStream;
			audioPlayer.current.play().catch((err) => {
				if (
					err.message ===
					"play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
				) {
					console.error("audio" + err.message);
				}
			});
		} else {
			audioPlayer.current.srcObject = null;
		}
	}, [screenShareAudioStream, screenShareOn, isLocal]);
	return (
		<div className={styles.parent}>
			<audio ref={audioPlayer} autoPlay playsInline controls={false} />
			{screenShareOn ? (
				<ReactPlayer
					playsinline // very very imp prop
					pip={false}
					light={false}
					controls={false}
					muted={true}
					playing={true}
					url={mediaStream}
					height={"100%"}
					width={"100%"}
					onError={(err) => {
						alert(err, "participant video error");
					}}
				/>
			) : null}
			<div className={styles.participantName}>
				{participant.displayName} is sharing screen
			</div>
		</div>
	);
}
