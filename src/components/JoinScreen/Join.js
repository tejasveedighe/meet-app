import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMeetingAndToken, setUsername } from "../../redux/meetingSlice";
import styles from "./Join.module.css";

export default function JoinScreen() {
	const [username, setUserName] = useState(null);
	const [meetId, setMeetId] = useState(null);
	const dispatch = useDispatch();
	const onClick = async (e) => {
		e.preventDefault();
		await dispatch(setUsername(username));
		await dispatch(getMeetingAndToken(meetId));
	};

	return (
		<form onSubmit={onClick}>
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
					<button type="submit" className={styles.button} onClick={onClick}>
						Join
					</button>
					OR
					<button className={styles.button} onClick={onClick}>
						Create Meeting
					</button>
				</div>
			</div>
		</form>
	);
}
