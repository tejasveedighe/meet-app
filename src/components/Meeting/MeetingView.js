import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import ParticipantView from "../Participant/Participant";
import Controls from "../Controls/Controls";

function MeetingView(props) {
	const [joined, setJoined] = useState(null);
	const { join, participants } = useMeeting({
		onMeetingJoined: () => {
			setJoined("JOINED");
		},
	});
	const joinMeeting = () => {
		setJoined("JOINING");
		join();
	};
	return (
		<div className="container">
			<h3>Meeting ID: {props.meetingId}</h3>
			{joined && joined === "JOINED" ? (
				<div>
					<Controls />
					{[...participants.keys()].map((participantId) => (
						<ParticipantView
							participantId={participantId}
							key={participantId}
						/>
					))}
				</div>
			) : joined && joined === "JOINING" ? (
				<p>Joining the meeting...</p>
			) : (
				<button onClick={joinMeeting}>Join</button>
			)}
		</div>
	);
}

export default MeetingView;
