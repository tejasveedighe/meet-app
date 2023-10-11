import React from "react";
import styles from "../VideoPlayer.module.css";

export default function VideoTime({ currentTime, duration }) {
	return (
		<div className={styles.duration}>
			{currentTime[0]}:{currentTime[1]} / {duration[0]}:{duration[1]}
		</div>
	);
}
