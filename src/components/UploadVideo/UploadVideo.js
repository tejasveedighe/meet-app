import axios from "axios";
import React, { useCallback, useState } from "react";

export default function UploadVideo() {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const handleFileChange = useCallback((e) => {
		// if (file?.type !== "video/mp4") alert("Please upload a video file");
		setFile(e.target.files[0]);
	}, []);
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setUploading(true);

			// if (file?.type !== "video/mp4") alert("Please upload a video file");
			// else {
			const formData = new FormData();
			formData.append("video_file", file);
			try {
				const res = await axios.post(
					"http://localhost:8000/api/post-video",
					formData
				);

				setTimeout(() => {
					setUploading(false);
				}, 2000);
			} catch (error) {
				console.error(error);
			}
			// }
		},
		[file]
	);
	const fileData = useCallback(() => {
		if (file) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {file.name}</p>

					<p>File Type: {file.type}</p>

					<p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	}, [file]);
	return (
		<div className="mt-3 flex items-center justify-center">
			<form onSubmit={handleSubmit}>
				<input accept="video/mp4" type="file" onChange={handleFileChange} />
				<button
					disabled={uploading}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					{uploading ? <p>uploading...</p> : <p>Upload Video!</p>}
				</button>
				{fileData()}
			</form>
		</div>
	);
}
