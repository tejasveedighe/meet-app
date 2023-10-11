import React from "react";
import styles from "../VideoPlayer.module.css";

export default function VideoRange({
	durationSec,
	currentTimeSec,
	handleChangeTime,
}) {
	return (
		<input
			type="range"
			min={0}
			max={durationSec}
			defaultValue={0}
			value={currentTimeSec}
			className={styles.videoRange}
			onChange={handleChangeTime}
		/>
	);
}
