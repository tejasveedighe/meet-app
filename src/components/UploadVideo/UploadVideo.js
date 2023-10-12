import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadVideo() {
	const [isUploading, setIsUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	const notify = useCallback((type, fileName) => {
		if (type === "error") {
			toast.error(`${fileName} Upload Failed`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else
			toast.success(`${fileName} Video Uploaded!`, {
				position: toast.POSITION.TOP_RIGHT,
			});
	}, []);
	const [uploadQueue, setUploadQueue] = useState([]);

	const handleFileChange = useCallback((e) => {
		setUploadQueue((prev) => [...prev, e.target.files[0]]);
	}, []);

	const handleSubmit = useCallback(
		async (file) => {
			setIsUploading(true);

			const formData = new FormData();
			formData.append("video", file);
			try {
				const res = await axios.post(
					"http://localhost:8000/api/postvideo",
					formData
				);
				if (res.status === 200) {
					notify("success", file.name);
				} else {
					notify("error", file.name);
				}
				setUploaded(true);
				setIsUploading(false);
			} catch (error) {
				console.error(error);
			}
		},
		[notify]
	);
	useEffect(() => {
		if (uploadQueue.length) {
			let removed = uploadQueue.pop();
			handleSubmit(removed);
		}
	}, [handleSubmit, notify, uploadQueue]);

	const fileData = useCallback(() => {
		if (uploadQueue) {
			return (
				<div>
					<h2>Files In Queue:</h2>
					<p>Number of Files: {uploadQueue.length}</p>
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
	}, [uploadQueue]);

	return (
		<div className="mt-3 flex items-center justify-center">
			<input accept="video/mp4" type="file" onChange={handleFileChange} />
			<button
				disabled={isUploading || uploaded}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
			{uploadQueue.length ? (
				<ColorRing
					visible={true}
					height="80"
					width="80"
					ariaLabel="blocks-loading"
					wrapperStyle={{}}
					wrapperClass="blocks-wrapper"
					colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
				/>
			) : null}
			<ToastContainer />
		</div>
	);
}
