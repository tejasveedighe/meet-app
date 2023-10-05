import React, { useCallback, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { url } from "../helper";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = useCallback(() => {
		if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
		}
	}, [isPlaying]);

	return (
		<div className={styles.parent}>
			<div className={styles.playerContainer}>
				<video
					ref={videoRef}
					width="70%"
					height={"70%"}
					className={styles.videoPlayer}
					src={url}
				></video>
				<div className={styles.controls}>
					<IconContext.Provider value={{ color: "white", size: "2em" }}>
						<BiSkipPrevious />
					</IconContext.Provider>
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
					<IconContext.Provider value={{ color: "white", size: "2em" }}>
						<BiSkipNext />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}
