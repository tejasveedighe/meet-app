import React from "react";
import styles from "../VideoPlayer.module.css";

export default function VideoLists({ videos, handleChangeVideo }) {
	return (
		<div className={styles.videoListContainer}>
			<ul>
				{videos.map((vid) => (
					<li
						key={vid.id}
						className={styles.videoLink}
						onClick={() => handleChangeVideo(vid.id)}
					>
						({vid.id})-
						{vid.title}
					</li>
				))}
			</ul>
		</div>
	);
}
