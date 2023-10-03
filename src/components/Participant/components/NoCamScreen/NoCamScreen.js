import React from "react";
import styles from "./NoCamScreen.module.css";
import ParticipantOptions from "../../../ParticipantOptions/ParticipantsOptions";

export default function NoCamScreen({ displayName }) {
	return (
		<div className={styles.parent}>
			{displayName}
			<ParticipantOptions />
		</div>
	);
}
