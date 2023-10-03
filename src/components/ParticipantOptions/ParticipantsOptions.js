import { Menu, Transition } from "@headlessui/react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";

export default function ParticipantOptions({ participantId }) {
	const { remove, isLocal } = useParticipant(participantId);
	const { moderator } = useSelector((store) => store.meeting);
	const handleRemoveParticipant = useCallback(() => {
		remove();
	}, [remove]);
	return (
		!isLocal && // isLocal so that the moderator cannot remove his own self
		moderator && (
			<div className="absolute bottom-2 right-0 w-56 text-right">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6"
							>
								<path
									fillRule="evenodd"
									d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
									clipRule="evenodd"
								/>
							</svg>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={handleRemoveParticipant}
											className={`${
												active ? "bg-violet-500 text-white" : "text-gray-900"
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											{active ? (
												<RemoveActiveIcon
													className="mr-2 h-5 w-5"
													aria-hidden="true"
												/>
											) : (
												<RemoveInactiveIcon
													className="mr-2 h-5 w-5"
													aria-hidden="true"
												/>
											)}
											Remove
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		)
	);
}

function RemoveInactiveIcon(props) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
		</svg>
	);
}

function RemoveActiveIcon(props) {
	return (
		<svg
			{...props}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
			<path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
		</svg>
	);
}
