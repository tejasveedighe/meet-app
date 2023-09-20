import { MeetingProvider } from "@videosdk.live/react-sdk";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "./api";
import JoinScreen from "./components/JoinScreen/Join";
import MeetingView from "./components/Meeting/MeetingView";
import { setMeetingId } from "./redux/meetingSlice";

const App = () => {
	const dispatch = useDispatch();
	const { meetingId } = useSelector((state) => state.meeting);

	const onMeetingLeave = () => {
		dispatch(setMeetingId(null));
	};

	return authToken && meetingId ? (
		<MeetingProvider
			config={{
				meetingId,
				micEnabled: false,
				webcamEnabled: false,
				name: "Tejasvee",
			}}
			token={authToken}
		>
			<MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
		</MeetingProvider>
	) : (
		<JoinScreen />
	);
};

export default App;
