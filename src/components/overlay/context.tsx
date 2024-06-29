import React, { createContext, useContext, useEffect, useState } from "react";
import { OVERLAY_CONTAINER_ID } from "./constaints";

export const OverlayContainer = () => {
	return <div id={OVERLAY_CONTAINER_ID}></div>;
};

interface OverlayContextProps {
	count: number;
	show: () => void;
	close: () => void;
}

const OverlayContext = createContext<OverlayContextProps>({
	count: 0,
	show: () => {},
	close: () => {},
});

export const useOverlayContext = () => useContext(OverlayContext);

export const OverlayProvider = ({
	children,
}: {
	children: React.ReactElement | React.ReactElement[];
}) => {
	const [count, setCount] = useState(0);
	const show = () => {
		setCount((value) => {
			return value + 1;
		});
	};
	const close = () => {
		setCount((value) => {
			if (value - 1 < 0) {
				return 0;
			}

			return value - 1;
		});
	};

	const hideScrollBar = () => {
		const currentWidth = window.document.body.offsetWidth;

		window.document
			.getElementsByTagName("html")[0]
			.classList.add("kl-overflow-hidden");
		window.document.body.classList.add("kl-overflow-hidden");

		const afterWidth = window.document.body.offsetWidth;

		window.document.body.setAttribute(
			"style",
			`padding-right: ${afterWidth - currentWidth}px`
		);
	};

	const getBackScrollBar = () => {
		window.document
			.getElementsByTagName("html")[0]
			.classList.remove("kl-overflow-hidden");
		window.document.body.classList.remove("kl-overflow-hidden");

		window.document.body.removeAttribute("style");
	};

	useEffect(() => {
		if (count == 0) {
			getBackScrollBar();
		} else {
			hideScrollBar();
		}

		return () => {
			getBackScrollBar();
		};
	}, [count]);

	return (
		<OverlayContext.Provider value={{ count, show, close }}>
			{children}
			<OverlayContainer></OverlayContainer>
		</OverlayContext.Provider>
	);
};
