import React from "react";

export default function VideoPlaybackControl({
	playbackRate,
	showPlaybackMenu,
	setPlaybackRate,
	handleSettingsClick,
}) {
	return (
		<div className="flex relative mr-3">
			<button onClick={handleSettingsClick}>x{playbackRate}</button>

			{showPlaybackMenu ? (
				<div className="absolute bg-slate-500 p-2 w-40 bottom-8 right-2 flex items-center justify-between">
					<button onClick={() => setPlaybackRate(0.25)}>0.25</button>
					<span className="border-2 border-cyan-50 h-6"></span>
					<button onClick={() => setPlaybackRate(0.5)}>0.5</button>
					<span className="border-2 border-cyan-50 h-6"></span>
					<button onClick={() => setPlaybackRate(1)}>1</button>
					<span className="border-2 border-cyan-50 h-6"></span>
					<button onClick={() => setPlaybackRate(1.5)}>1.5</button>
					<span className="border-2 border-cyan-50 h-6"></span>
					<button onClick={() => setPlaybackRate(2.0)}>2</button>
				</div>
			) : null}
		</div>
	);
}
