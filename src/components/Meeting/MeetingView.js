import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { setMeetingId } from "../../redux/meetingSlice";
import Controls from "../Controls/Controls";
import RenderParticipants from "../RenderParticipants/RenderParticipants";
import ScreenShare from "../ScreenShare/ScreenShare";
import styles from "./MeetingView.module.css";
import ParticipantsList from "../Participant/components/ParticipantsList/ParticipantsList";

function MeetingView(props) {
	const dispatch = useDispatch();
	const [joined, setJoined] = useState(null);

	const { join, participants, meeting } = useMeeting({
		onMeetingJoined: () => {
			setJoined("JOINED");
		},
		onEntryRequested: (participant) => {
			if (window.confirm(`Entry requested by ${participant.name}`)) {
				participant.allow();
			} else {
				participant.deny();
			}
		},
		onEntryResponded: (participantId, decision) => {
			if (decision === "allowed") {
				setJoined("JOINED");
			} else if (!meeting) {
				setJoined("REJECTED");
			}
		},
	});

	const joinMeeting = () => {
		setJoined("JOINING");
		join();
	};

	const handleReset = useCallback(() => {
		dispatch(setMeetingId(null));
	}, [dispatch]);

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
					<ParticipantsList
						list={participants}
						presenting={presenterId ? true : false}
					/>
				</div>
			) : joined && joined === "JOINING" ? (
				<p>Joining the meeting...</p>
			) : joined && joined === "REJECTED" ? (
				<>
					<p>The Moderator has denied your entry! </p>
					<button className={styles.button} onClick={handleReset}>
						Home
					</button>
				</>
			) : (
				<button className={styles.button} onClick={joinMeeting}>
					Join
				</button>
			)}
		</div>
	);
}

export default MeetingView;
