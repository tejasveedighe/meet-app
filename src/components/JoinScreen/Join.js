import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	getMeetingAndToken,
	getToken,
	setUsername,
} from "../../redux/meetingSlice";
import styles from "./Join.module.css";

export default function JoinScreen() {
	const [username, setUserName] = useState(null);
	const [meetId, setMeetId] = useState(null);

	const dispatch = useDispatch();

	const onJoinMeeting = async (e) => {
		e.preventDefault();
		await dispatch(getToken(false));
		await dispatch(setUsername(username));
		await dispatch(getMeetingAndToken(meetId));
	};

	const onCreateMeeting = async (e) => {
		e.preventDefault();
		await dispatch(getToken(true));
		await dispatch(setUsername(username));
		await dispatch(getMeetingAndToken(meetId));
	};

	return (
		<form onSubmit={onJoinMeeting}>
			<div className={styles.parent}>
				<input
					className={styles.meetingIdInput}
					type="text"
					placeholder="Enter Username"
					onChange={(e) => setUserName(e.currentTarget.value)}
					required
				/>
				<input
					className={styles.meetingIdInput}
					type="text"
					placeholder="Enter Meeting Id"
					onChange={(e) => {
						setMeetId(e.currentTarget.value);
					}}
				/>
				<div className={styles.buttonsRow}>
					<button
						disabled={!meetId}
						type="submit"
						className={meetId ? styles.button : styles.disabledButton}
					>
						Join
					</button>
					OR
					<button
						disabled={meetId}
						className={meetId ? styles.disabledButton : styles.button}
						onClick={onCreateMeeting}
					>
						Create Meeting
					</button>
				</div>
			</div>
		</form>
	);
}
