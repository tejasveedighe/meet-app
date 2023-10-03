import React from "react";
import styles from "./NoCamScreen.module.css";

export default function NoCamScreen({ displayName }) {
	return <div className={styles.parent}>{displayName}</div>;
}
