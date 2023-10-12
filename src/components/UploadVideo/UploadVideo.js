import axios from "axios";
import React, { useCallback, useState } from "react";

export default function UploadVideo() {
	const [file, setFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const handleFileChange = useCallback((e) => {
		setFile(e.target.files[0]);
	}, []);
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setIsUploading(true);

			const formData = new FormData();
			formData.append("video", file);
			try {
				const res = await axios.post(
					"http://localhost:8000/api/postvideo",
					formData
				);
				if (res.status === 200) {
					setIsUploading(false);
					setUploaded(true);
				}
			} catch (error) {
				console.error(error);
			}
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
					disabled={isUploading || uploaded}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					{uploaded ? (
						<p>Uploaded!</p>
					) : isUploading ? (
						<p>uploading...</p>
					) : (
						<p>Upload Video!</p>
					)}
				</button>
				{fileData()}
			</form>
		</div>
	);
}
