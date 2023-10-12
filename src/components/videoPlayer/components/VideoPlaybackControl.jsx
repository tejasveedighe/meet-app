import React from "react";
import styles from "../VideoPlayer.module.css";

export default function VideoPlaybackControl({
	playbackRate,
	showPlaybackMenu,
	setPlaybackRate,
	handleSettingsClick,
}) {
	return (
		<div className={styles.playbackMenuButton}>
			<button onClick={handleSettingsClick}>x{playbackRate}</button>

			{showPlaybackMenu ? (
				<div className={styles.playbackMenu}>
					<button onClick={() => setPlaybackRate(0.25)}>0.25</button>
					<span className={styles.border}></span>
					<button onClick={() => setPlaybackRate(0.5)}>0.5</button>
					<span className={styles.border}></span>
					<button onClick={() => setPlaybackRate(1)}>1</button>
					<span className={styles.border}></span>
					<button onClick={() => setPlaybackRate(1.5)}>1.5</button>
					<span className={styles.border}></span>
					<button onClick={() => setPlaybackRate(2.0)}>2</button>
				</div>
			) : null}
		</div>
	);
}
