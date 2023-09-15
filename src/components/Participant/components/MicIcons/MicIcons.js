import React from "react";
import MicOnBlack from "./assets/microphone-svgrepo-com.svg";
import MicOnWhite from "./assets/microphone-svgrepo-com (2).svg";
import MicOffWhite from "./assets/microphone-mute-record-song-sound-voice-svgrepo-com (1).svg";
import MicOffBlack from "./assets/microphone-mute-record-song-sound-voice-svgrepo-com.svg";
import styles from "./MicIcons.module.css";

export default function MicIcons({ webcamOn, micOn }) {
	return micOn ? (
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
	);
}
