import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import MeetingView from "./components/Meeting/MeetingView";

const App = () => {
	return (
		<MeetingProvider
			config={{
				meetingId: "5x30-oepe-561b",
				micEnabled: true,
				webcamEnabled: true,
				name: "Tejasvee's Org",
			}}
			token={process.env.REACT_APP_VIDEO_SDK_TOKEN}
		>
			<MeetingView />
		</MeetingProvider>
	);
};

export default App;
