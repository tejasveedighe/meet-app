import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoData } from "../../redux/videoStreamingSlice";
import UploadVideo from "../UploadVideo/UploadVideo";
import styles from "./VideoPlayer.module.css";
import VideoDetails from "./components/VideoDetails";
import VideoLists from "./components/VideoLists";
import VideoPlaybackControl from "./components/VideoPlaybackControl";
import VideoRange from "./components/VideoRange";
import VideoSeekControls from "./components/VideoSeekControls";
import VideoTime from "./components/VideoTime";
import { AiOutlineExpand } from "react-icons/ai";

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

	const handleFullScreen = useCallback(() => {
		if (videoRef.current.requestFullscreen) {
			videoRef.current.requestFullscreen();
		} else if (videoRef.current.webkitRequestFullscreen) {
			/* Safari */
			videoRef.current.webkitRequestFullscreen();
		} else if (videoRef.current.msRequestFullscreen) {
			/* IE11 */
			videoRef.current.msRequestFullscreen();
		}
	}, []);

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
							fullscreen
							width="1270"
							height="720"
							className={styles.videoPlayer}
							src={currentVideo.url}
						></video>
						<div className={classNames(styles.videoInfo, "bg-slate-700")}>
							<div className="flex items-center">
								<VideoSeekControls
									handlePlay={handlePlay}
									handleSeek={handleSeek}
									isPlaying={isPlaying}
								/>
								<VideoTime currentTime={currentTime} duration={duration} />
							</div>
							<div className="flex items-center gap-4 mr-4">
								<VideoPlaybackControl
									handleSettingsClick={handleSettingsClick}
									playbackRate={playbackRate}
									setPlaybackRate={setPlaybackRate}
									showPlaybackMenu={showPlaybackMenu}
								/>
								<button onClick={handleFullScreen}>
									<AiOutlineExpand />
								</button>
							</div>
						</div>
						<VideoRange
							durationSec={durationSec}
							currentTimeSec={currentTimeSec}
							handleChangeTime={handleChangeTime}
						/>
					</div>
					<VideoLists videos={videos} handleChangeVideo={handleChangeVideo} />
				</div>
			</div>
			<UploadVideo />
		</>
	);
}
