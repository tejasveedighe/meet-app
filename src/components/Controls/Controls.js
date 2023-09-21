import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useCallback } from "react";
import {
	BsCameraVideo,
	BsCameraVideoOff,
	BsMic,
	BsMicMute,
} from "react-icons/bs";
import { LuScreenShareOff, LuScreenShare } from "react-icons/lu";
import { PiPhoneDisconnectBold } from "react-icons/pi";
import styles from "./Controls.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setMeetingId } from "../../redux/meetingSlice";

export default function Controls() {
	const {
		leave,
		toggleMic,
		toggleWebcam,
		toggleScreenShare,
		localMicOn,
		localWebcamOn,
		localScreenShareOn,
	} = useMeeting();

	const dispatch = useDispatch();
	const handleLeaveMeeting = useCallback(() => {
		dispatch(setMeetingId(null));
		leave();
	}, [dispatch, leave]);

	return (
		<div className={styles.parent}>
			<button
				className={classNames(styles.button, styles.redIcon)}
				onClick={handleLeaveMeeting}
			>
				<PiPhoneDisconnectBold className={styles.icon} />
			</button>
			<button className={styles.button} onClick={() => toggleMic()}>
				{localMicOn ? (
					<BsMic className={styles.icon} />
				) : (
					<BsMicMute className={styles.icon} />
				)}
			</button>
			<button className={styles.button} onClick={() => toggleWebcam()}>
				{localWebcamOn ? (
					<BsCameraVideo className={styles.icon} />
				) : (
					<BsCameraVideoOff className={styles.icon} />
				)}
			</button>
			<button
				className={classNames(
					styles.button,
					localScreenShareOn ? styles.redIcon : ""
				)}
				onClick={() => toggleScreenShare()}
			>
				{localScreenShareOn ? (
					<LuScreenShareOff className={styles.icon} />
				) : (
					<LuScreenShare className={styles.icon} />
				)}
			</button>
		</div>
	);
}
