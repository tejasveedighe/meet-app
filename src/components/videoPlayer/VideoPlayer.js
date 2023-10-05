import React from "react";
import { url } from "../helper";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
	return (
		<div className={styles.videoPlayerContainer}>
			<video controls width="70%" className="videoPlayer" src={url}></video>;
		</div>
	);
}
