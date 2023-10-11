import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { RiForward15Line, RiReplay15Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setVideoData } from "../../redux/videoStreamingSlice";
import UploadVideo from "../UploadVideo/UploadVideo";
import styles from "./VideoPlayer.module.css";
import VideoDetails from "./components/VideoDetails";
import VideoLists from "./components/VideoLists";

export default function VideoPlayer() {
	const { videos } = useSelector((store) => store.video);
	const [currentVideo, setCurrentVideo] = useState(videos[0]);

	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const [currentTime, setCurrentTime] = useState([0, 0]);
	const [currentTimeSec, setCurrentTimeSec] = useState(0);
	const [duration, setDuration] = useState([0, 0]);
	const [durationSec, setDurationSec] = useState(0);

	const [showPlaybackMenu, setShowPlaybackMenu] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);

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

	const dispatch = useDispatch();
	const handleChangeVideo = useCallback(
		(id) => {
			videoRef.current.pause();
			setIsPlaying(false);

			const { min, sec } = sec2Min(videoRef.current.currentTime);
			const _video = {
				...currentVideo,
				progress: {
					time: [min, sec],
					sec: sec,
				},
			};
			dispatch(setVideoData(_video));
			const vid = videos.find((vid) => vid.id === id);
			setCurrentVideo(vid);
			setCurrentTime(vid.progress.time);
			setCurrentTimeSec(vid.progress.sec);
			videoRef.current.currentTime = vid.progress.sec;
		},
		[currentVideo, dispatch, sec2Min, videos]
	);

	const handleSeek = useCallback((val) => {
		videoRef.current.currentTime += val;
	}, []);

	const handleSettingsClick = useCallback(() => {
		setShowPlaybackMenu((prev) => !prev);
	}, []);

	useEffect(() => {
		videoRef.current.playbackRate = playbackRate;
	}, [playbackRate]);

	const handleVideoClick = useCallback(
		(event) => {
			if (videoRef.current && videoRef.current.contains(event.target)) {
				setIsPlaying((prev) => !prev);
				handlePlay();
			}
		},
		[handlePlay]
	);
	useEffect(() => {
		document.addEventListener("mousedown", handleVideoClick);

		return () => document.removeEventListener("mousedown", handleVideoClick);
	}, [handleVideoClick]);

	return (
		<>
			<div className="content-center justify-center flex-col">
				<VideoDetails
					videoId={currentVideo.id}
					videoTitle={currentVideo.title}
				/>
				<div className={styles.parent}>
					<div className={styles.playerContainer}>
						<video
							ref={videoRef}
							defaultPlaybackRate={1}
							width="1270"
							height="720"
							className={styles.videoPlayer}
							src={currentVideo.url}
						></video>
						<div className={classNames(styles.videoInfo, "bg-slate-700")}>
							<div className="flex items-center">
								<div className={styles.controls}>
									<IconContext.Provider value={{ color: "white", size: "2em" }}>
										<BiSkipPrevious />
									</IconContext.Provider>
									<button
										className={styles.controlButton}
										onClick={() => handleSeek(-15)}
									>
										<RiReplay15Line />
									</button>
									{isPlaying ? (
										<button
											className={styles.controlButton}
											onClick={handlePlay}
										>
											<IconContext.Provider
												value={{ color: "white", size: "2em" }}
											>
												<BiPause />
											</IconContext.Provider>
										</button>
									) : (
										<button
											className={styles.controlButton}
											onClick={handlePlay}
										>
											<IconContext.Provider
												value={{ color: "white", size: "2em" }}
											>
												<BiPlay />
											</IconContext.Provider>
										</button>
									)}
									<button
										className={styles.controlButton}
										onClick={() => handleSeek(15)}
									>
										<RiForward15Line />
									</button>
									<IconContext.Provider value={{ color: "white", size: "2em" }}>
										<BiSkipNext />
									</IconContext.Provider>
								</div>
								<div className={styles.duration}>
									{currentTime[0]}:{currentTime[1]} / {duration[0]}:
									{duration[1]}
								</div>
							</div>
							<div className="flex relative">
								<button onClick={handleSettingsClick}>x{playbackRate}</button>

								{showPlaybackMenu ? (
									<div className="absolute bg-slate-500 p-2 w-40 bottom-8 right-2 flex items-center justify-between">
										<button onClick={() => setPlaybackRate(0.25)}>0.25</button>
										<span className="border-2 border-cyan-50 h-6"></span>
										<button onClick={() => setPlaybackRate(0.5)}>0.5</button>
										<span className="border-2 border-cyan-50 h-6"></span>
										<button onClick={() => setPlaybackRate(1)}>1</button>
										<span className="border-2 border-cyan-50 h-6"></span>
										<button onClick={() => setPlaybackRate(1.5)}>1.5</button>
										<span className="border-2 border-cyan-50 h-6"></span>
										<button onClick={() => setPlaybackRate(2.0)}>2</button>
									</div>
								) : null}
							</div>
						</div>
						<input
							type="range"
							min={0}
							max={durationSec}
							defaultValue={0}
							value={currentTimeSec}
							onChange={handleChangeTime}
						/>
					</div>
					<VideoLists videos={videos} handleChangeVideo={handleChangeVideo} />
				</div>
			</div>
			<UploadVideo />
		</>
	);
}
