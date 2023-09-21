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
						<Row key={participants} align="start" justify="center" gutter={40}>
							{participants.map((participantId) => {
								return (
									<Col key={participantId}>
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
							<Row key={participantId} gutter={4}>
								<ParticipantView
									participantId={participantId}
									key={participantId}
								/>
							</Row>
						);
					});
				}
			})}
		</>
	);
}
