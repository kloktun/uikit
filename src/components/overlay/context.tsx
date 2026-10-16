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
	/** The open overlays in the order they opened: the last one is on top */
	ids: string[];
	show: (id: string) => void;
	close: (id: string) => void;
}

const OverlayContext = createContext<OverlayContextProps>({
	count: 0,
	ids: [],
	show: (id: string) => {},
	close: (id: string) => {},
});

export const useOverlayContext = () => useContext(OverlayContext);

/** The overlay a component is rendered in; null — the page */
export const CurrentOverlayContext = createContext<string | null>(null);

/**
 * Whether an overlay opened over the component covers it: true on the page
 * while any window is open, in a window while another opened over it. E.g.
 * a covered video stops, covered hotkeys don't act
 */
export const useIsCoveredByOverlay = () => {
	const current = useContext(CurrentOverlayContext);
	const { ids } = useOverlayContext();
	return (ids[ids.length - 1] ?? null) !== current;
};

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

	// Only the document stops scrolling: an overflow on <body> too would make
	// it the scroll container of sticky elements, and they'd jump. The
	// scrollbar's width goes to the body's padding so the page doesn't shift
	const hideScrollBar = () => {
		const html = document.documentElement;
		const widthBefore = html.clientWidth;

		html.classList.add("kl-overflow-hidden");

		const scrollbarWidth = html.clientWidth - widthBefore;
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
	};

	const getBackScrollBar = () => {
		document.documentElement.classList.remove("kl-overflow-hidden");
		document.body.style.removeProperty("padding-right");
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
		<OverlayContext.Provider value={{ count, ids: overlayIds, show, close }}>
			{children}
			<OverlayContainer></OverlayContainer>
		</OverlayContext.Provider>
	);
};
