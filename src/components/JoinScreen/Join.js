import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	getMeetingAndToken,
	getToken,
	setUsername,
} from "../../redux/meetingSlice";
import styles from "./Join.module.css";
import classNames from "classnames";

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
				{!username && <span>Username is required!!</span>}
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
						type="submit"
						className={classNames(
							!meetId || !username ? styles.disabledButton : styles.button
						)}
						disabled={!meetId || !username}
					>
						Join
					</button>
					OR
					<button
						className={
							meetId || !username ? styles.disabledButton : styles.button
						}
						onClick={onCreateMeeting}
						disabled={meetId || !username}
					>
						Create Meeting
					</button>
				</div>
			</div>
		</form>
	);
}
