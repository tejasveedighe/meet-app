import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import "react-simple-flex-grid/lib/main.css";
import Controls from "../Controls/Controls";
import RenderParticipants from "../RenderParticipants/RenderParticipants";
import ScreenShare from "../ScreenShare/ScreenShare";
import styles from "./MeetingView.module.css";
import { Col, Row } from "react-simple-flex-grid";

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
					<Row justify="center">
						<Col order={2}>
							<RenderParticipants
								participants={participants}
								presenterId={presenterId}
							/>
						</Col>
						{presenterId ? (
							<Col order={1} span={9}>
								<ScreenShare participantId={presenterId} />
							</Col>
						) : null}
					</Row>

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
