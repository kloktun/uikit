import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { OVERLAY_CONTAINER_ID } from "./constaints";

export const OverlayContainer = () => {
	return <div id={OVERLAY_CONTAINER_ID}></div>;
};

interface OverlayContextProps {
	count: number;
	show: (id: string) => void;
	close: (id: string) => void;
}

const OverlayContext = createContext<OverlayContextProps>({
	count: 0,
	show: (id: string) => {},
	close: (id: string) => {},
});

export const useOverlayContext = () => useContext(OverlayContext);

export const OverlayProvider = ({
	children,
}: {
	children: React.ReactElement | React.ReactElement[];
}) => {
	const [overlayIds, setOverlayIds] = useState<string[]>([]);
	const count = useMemo(() => overlayIds.length, [overlayIds]);

	const show = (id: string) => {
		setOverlayIds((value) => {
			if (value.includes(id)) {
				return value;
			}

			return [...value, id];
		});
	};

	const close = (id: string) => {
		// console.log("-------------------");
		// console.log("close");
		// console.log("-------------------");

		setOverlayIds((value) => {
			return value.filter((item) => item !== id);
		});
	};

	const hideScrollBar = () => {
		const currentWidth = document.body.offsetWidth;

		const html = document.getElementsByTagName("html")[0];
		const body = document.body;

		html.classList.add("kl-overflow-hidden");
		body.classList.add("kl-overflow-hidden");

		const afterWidth = body.offsetWidth;

		body.setAttribute("style", `padding-right: ${afterWidth - currentWidth}px`);
	};

	const getBackScrollBar = () => {
		const html = document.getElementsByTagName("html")[0];
		const body = document.body;

		html.classList.remove("kl-overflow-hidden");
		body.classList.remove("kl-overflow-hidden");

		body.removeAttribute("style");
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
