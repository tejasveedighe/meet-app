import { useDispatch, useSelector } from "react-redux";
import { getMeetingAndToken, setMeetingId } from "../../redux/meetingSlice";

export default function JoinScreen() {
	const { meetingId } = useSelector((state) => state.meeting);
	const dispatch = useDispatch();
	const onClick = async () => {
		await dispatch(getMeetingAndToken(meetingId));
	};
	return (
		<div>
			<input
				type="text"
				placeholder="Enter Meeting Id"
				onChange={(e) => {
					dispatch(setMeetingId(e.target.value));
				}}
			/>
			<button onClick={onClick}>Join</button>
			{" or "}
			<button onClick={onClick}>Create Meeting</button>
		</div>
	);
}
