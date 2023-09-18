import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { Col, Row } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import Controls from "../Controls/Controls";
import ParticipantView from "../Participant/Participant";

const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};

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
		<div>
			<h3>Meeting ID: {props.meetingId}</h3>
			{joined && joined === "JOINED" ? (
				<div>
					<Controls />
					{chunk([...participants.keys()]).map((participants) => (
						<Row
							key={participants}
							gutter={80}
							align="top"
							justify="space-between"
						>
							{participants.map((participantId) => {
								return (
									<Col span={4}>
										<ParticipantView
											participantId={participantId}
											key={participantId}
										/>
									</Col>
								);
							})}
						</Row>
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
