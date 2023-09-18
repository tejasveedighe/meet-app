import styles from "./Join.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingAndToken, setMeetingId } from "../../redux/meetingSlice";

export default function JoinScreen() {
	const { meetingId } = useSelector((state) => state.meeting);
	const dispatch = useDispatch();
	const onClick = async () => {
		await dispatch(getMeetingAndToken(meetingId));
	};
	return (
		<div className={styles.parent}>
			<input
				className={styles.meetingIdInput}
				type="text"
				placeholder="Enter Meeting Id"
				onChange={(e) => {
					dispatch(setMeetingId(e.target.value));
				}}
			/>
			<div className={styles.buttonsRow}>
				<button className={styles.button} onClick={onClick}>
					Join
				</button>
				OR
				<button className={styles.button} onClick={onClick}>
					Create Meeting
				</button>
			</div>
		</div>
	);
}
