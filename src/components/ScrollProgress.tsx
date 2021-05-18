import React from "react";
import { useScrollHeight } from "../hooks";

const ScrollProgress = () => {
	const scrolled = useScrollHeight();
	const progressBarStyle = {
		height: "2px",
		background: "#4285f4",
		width: `${scrolled * 100}vw`,
	};

	return (
		<div
			className="progress-container"
			style={{
				background: "#fffb00",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
				height: "2px",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				zIndex: 999,
			}}
		>
			<div className="progress-bar" style={progressBarStyle} />
		</div>
	);
};

export { ScrollProgress };
