import React from "react";
import { IconContext } from "react-icons";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import styles from "../VideoPlayer.module.css";
import { RiForward15Line, RiReplay15Line } from "react-icons/ri";

export default function VideoSeekControls({
	handleSeek,
	isPlaying,
	handlePlay,
}) {
	return (
		<div className={styles.controls}>
			<IconContext.Provider value={{ color: "white", size: "2em" }}>
				<BiSkipPrevious />
			</IconContext.Provider>
			<button className={styles.controlButton} onClick={() => handleSeek(-15)}>
				<RiReplay15Line />
			</button>
			{isPlaying ? (
				<button className={styles.controlButton} onClick={handlePlay}>
					<IconContext.Provider value={{ color: "white", size: "2em" }}>
						<BiPause />
					</IconContext.Provider>
				</button>
			) : (
				<button className={styles.controlButton} onClick={handlePlay}>
					<IconContext.Provider value={{ color: "white", size: "2em" }}>
						<BiPlay />
					</IconContext.Provider>
				</button>
			)}
			<button className={styles.controlButton} onClick={() => handleSeek(15)}>
				<RiForward15Line />
			</button>
			<IconContext.Provider value={{ color: "white", size: "2em" }}>
				<BiSkipNext />
			</IconContext.Provider>
		</div>
	);
}
