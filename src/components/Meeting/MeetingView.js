import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { Col, Row } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import Controls from "../Controls/Controls";
import ParticipantView from "../Participant/Participant";
import styles from "./MeetingView.module.css";
import ScreenShare from "../ScreenShare/ScreenShare";

const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};

const RenderParticipants = ({ participants, presenterId }) => {
	const gridParticipants = chunk([...participants.keys()]);
	return (
		<>
			{gridParticipants.map((participants) => {
				if (!presenterId) {
					return (
						<Row key={participants} align="center" justify="center">
							{participants.map((participantId) => {
								return (
									<Col key={participantId} span={4}>
										<ParticipantView
											participantId={participantId}
											key={participantId}
										/>
									</Col>
								);
							})}
						</Row>
					);
				} else {
					return (
						<>
							{participants.map((participantId) => {
								return (
									<Col key={participantId} span={4}>
										<ParticipantView
											participantId={participantId}
											key={participantId}
										/>
									</Col>
								);
							})}
						</>
					);
				}
			})}
		</>
	);
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
	const { presenterId } = useMeeting();
	return (
		<div>
			<h3>Meeting ID: {props.meetingId}</h3>
			{joined && joined === "JOINED" ? (
				<div className={styles.parent}>
					<ScreenShare participantId={presenterId} />
					<RenderParticipants
						participants={participants}
						presenterId={presenterId}
					/>
					<Controls />
				</div>
			) : joined && joined === "JOINING" ? (
				<p>Joining the meeting...</p>
			) : (
				<button className={styles.button} onClick={joinMeeting}>
					Join
				</button>
			)}
		</div>
	);
}

export default MeetingView;
