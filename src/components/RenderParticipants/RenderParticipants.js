import React from "react";
import { chunk } from "../helper";
import ParticipantView from "../Participant/Participant";
import { Col, Row } from "react-simple-flex-grid";

export default function RenderParticipants({ participants, presenterId }) {
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
					return participants.map((participantId) => {
						return (
							<Col key={participantId} span={4}>
								<ParticipantView
									participantId={participantId}
									key={participantId}
								/>
							</Col>
						);
					});
				}
			})}
		</>
	);
}
