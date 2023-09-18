import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import styles from "./Controls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Controls() {
	const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
	return (
		<div className={styles.parent}>
			<button onClick={() => leave()}>Leave</button>
			<button onClick={() => toggleMic()}>toggleMic</button>
			<button onClick={() => toggleWebcam()}>toggleWebcam</button>
			<button onClick={() => toggleScreenShare()}>toggleScreenShare</button>
		</div>
	);
}
