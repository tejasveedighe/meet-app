import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./meetingSlice";
import videoStreamingReducer from "./videoStreamingSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
	meeting: meetingReducer,
	video: videoStreamingReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["video", "meeting"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
});
