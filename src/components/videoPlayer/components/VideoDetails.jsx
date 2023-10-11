import React from "react";

function VideoDetails({ videoId, videoTitle }) {
	return (
		<div className="p-4">
			<p>Id - {videoId}</p>
			<p>Title - {videoTitle}</p>
		</div>
	);
}

export { VideoDetails as default };
