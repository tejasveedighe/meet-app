import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { url } from "../helper";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const [currentTime, setCurrentTime] = useState([0, 0]);
	const [currentTimeSec, setCurrentTimeSec] = useState();
	const [duration, setDuration] = useState([0, 0]);
	const [durationSec, setDurationSec] = useState();


	const handlePlay = useCallback(() => {
		if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
		}
	}, [isPlaying]);

	const sec2Min = useCallback((sec) => {
		const min = Math.floor(sec / 60);
		const secRemain = Math.floor(sec % 60);
		return {
			min: min,
			sec: secRemain,
		};
	}, []);

	useEffect(() => {
		const { min, sec } = sec2Min(videoRef.current.duration);
		setDurationSec(videoRef.current.duration);
		setDuration([min, sec]);

		const interval = setInterval(() => {
			const { min, sec } = sec2Min(videoRef.current.currentTime);
			setCurrentTimeSec(videoRef.current.currentTime);
			setCurrentTime([min, sec]);
		}, 1000);
		return () => clearInterval(interval);
	}, [currentTime, isPlaying, sec2Min]);

	const handleChangeTime = useCallback((e) => {
		videoRef.current.currentTime = e.target.value;
	}, []);

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
				<div className={styles.videoInfo}>
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
					<div className={styles.duration}>
						{currentTime[0]}:{currentTime[1]} / {duration[0]}:{duration[1]}
					</div>
				</div>
				<input
					type="range"
					min="0"
					max={durationSec}
					defaultValue={0}
					value={currentTimeSec}
					className={styles.timeline}
					onChange={handleChangeTime}
				/>
			</div>
		</div>
	);
}
