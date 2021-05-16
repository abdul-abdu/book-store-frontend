import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (currentCategory: string) => {
	const location = useLocation();
	useEffect(() => {
		const scrollTop = () => window.scroll(0, 0);

		scrollTop();

		return window.removeEventListener("scroll", scrollTop);
	}, [location.pathname, currentCategory]);
};

export { useScrollToTop };
