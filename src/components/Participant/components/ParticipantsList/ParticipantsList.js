import React, { useState } from "react";
import styles from "./ParticipantsList.module.css";
import { FiUsers } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";

export default function ParticipantsList({ list, presenting }) {
	const [showDropdown, setShowDropdown] = useState(false);
	return (
		<div
			style={{ display: presenting ? "block" : "none" }}
			className={styles.parent}
		>
			{showDropdown && (
				<div className={styles.dropup}>
					{Array.from(list.values()).map((participant) => (
						<li className={styles.listItem} key={participant.id}>
							{participant.displayName}
							<SlOptionsVertical />
						</li>
					))}
				</div>
			)}
			<button
				className={styles.button}
				onClick={() => setShowDropdown((prev) => !prev)}
			>
				<FiUsers />
				Other Participants
			</button>
		</div>
	);
}
