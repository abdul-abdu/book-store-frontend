import { useEffect, useState } from "react";

const useScrollHeight = () => {
	const [scrolled, setScrolled] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", scrollProgress);

		return () => window.removeEventListener("scroll", scrollProgress);
	});

	const scrollProgress = () => {
		const scrollPx = document.documentElement.scrollTop;
		const winHeightPx =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scrolled = scrollPx / winHeightPx;

		setScrolled(scrolled);
	};

	return scrolled;
};

export { useScrollHeight };
