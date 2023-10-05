import React from "react";
import { useSelector } from "react-redux";
import Livestream from "./components/Livestream/Livestream";
import Meeting from "./components/Meeting/Meeting";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import VideoPlayer from "./components/videoPlayer/VideoPlayer";

const App = () => {
	const { mode } = useSelector((store) => store.meeting);

	return mode === null ? (
		<WelcomeScreen />
	) : mode === "MEET" ? (
		<Meeting />
	) : mode === "STREAM" ? (
		<Livestream />
	) : mode === "VIDEO" ? (
		<VideoPlayer />
	) : (
		<div>Not Found</div>
	);
};

export default App;
