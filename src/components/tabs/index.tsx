import React, {
	EventHandler,
	MouseEventHandler,
	ReactElement,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Tab, { TabProps } from "../tab";

interface TabsContextProps {
	currentTabIndex: number;
	tabs: TabProps[];
	onChange: (index: number) => void;
	children: ReactElement;
}

const Context = createContext<TabsContextProps>({
	currentTabIndex: 0,
	tabs: [],
	onChange: (index) => {},
	children: <></>,
});

const useTabsContext = () => useContext(Context);

const TabsPanel = () => {
	const { currentTabIndex, tabs, onChange } = useTabsContext();

	const viewportRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const addListeners = () => {
		window.addEventListener("mousemove", onMouseMove);
	};

	const removeListeners = () => {
		window.removeEventListener("mousemove", onMouseMove);
	};

	useEffect(() => {
		addListeners();
		return removeListeners;
	}, []);

	const [dragging, setDragging] = useState(false);
	const [startDraggingX, setStartDraggingX] = useState(0);
	const [startScrollPosition, setStartScrollPosition] = useState(0);
	const [mouseX, setMouseX] = useState(0);

	const currentScrollValue = useMemo(() => {
		return mouseX - startDraggingX;
	}, [startDraggingX, mouseX]);

	useEffect(() => {
		if (!dragging) {
			return;
		}

		const viewportEl = viewportRef?.current;
		const currentScrollPosition = viewportEl?.scrollLeft ?? 0;

		viewportEl?.scrollTo({
			left: startScrollPosition - currentScrollValue,
		});
	}, [currentScrollValue, dragging]);

	const disableSelection = () => {
		document.body.style.userSelect = "none";
	};

	const enableSelection = () => {
		document.body.style.userSelect = "inherit";
	};

	useEffect(() => {
		if (dragging) {
			disableSelection();
		} else {
			enableSelection();
		}

		return enableSelection;
	}, [dragging]);

	const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		setStartDraggingX(e.clientX);
		setStartScrollPosition(viewportRef?.current?.scrollLeft ?? 0);
	};

	const stopDragging = () => {
		setDragging(false);
	};

	const onMouseDown: MouseEventHandler<HTMLDivElement> = (
		e: React.MouseEvent<HTMLDivElement>
	) => {
		startDragging(e);
		window.addEventListener("mouseup", onMouseUp);
	};

	const onMouseUp = (e: MouseEvent) => {
		stopDragging();
		window.removeEventListener("mouseup", onMouseUp);
	};

	const onMouseMove = (e: MouseEvent) => {
		setMouseX(e.clientX);
	};

	const scrollToElement = (index: number) => {
		const viewportEl = viewportRef?.current;
		const contentEl = contentRef?.current;
		const clickedChild = contentEl?.children[index];

		if (!viewportEl || !clickedChild) {
			return;
		}

		const childBounds = clickedChild.getBoundingClientRect();
		const viewportBounds = viewportEl.getBoundingClientRect();
		const contentBounds = contentEl.getBoundingClientRect();

		const { x: viewportX, width: viewportWidth } = viewportBounds;
		const { x: childX, width: childWidth } = childBounds;
		const { x: contentX, width: contentWidth } = contentBounds;

		const viewportEndX = viewportX + viewportWidth;
		const childEndX = childX + childWidth;
		const childStartDistance = childX - contentX;

		console.log({
			contentX,
			childX,
			childStartDistance,
		});

		if (childEndX > viewportEndX) {
			viewportEl.scrollTo({
				left: childStartDistance - childWidth,
			});

			return;
		}

		if (childX < viewportX) {
			viewportEl.scrollTo({
				left: childStartDistance,
			});
		}
	};

	return (
		<div
			ref={viewportRef}
			className="kl-flex kl-flex-row kl-overflow-x-auto kl-no-scrollbar"
			onMouseDown={onMouseDown}
		>
			<div ref={contentRef} className="kl-flex kl-flex-row">
				{tabs.map((tab, index) => {
					const active = index == currentTabIndex;
					const handleClick = () => {
						if (tab.onClick) {
							tab.onClick();
						}

						onChange(index);
					};

					return (
						<Tab key={index} {...tab} active={active} onClick={handleClick} />
					);
				})}
			</div>
		</div>
	);
};

const TabsCurrent = () => {
	const { children } = useTabsContext();

	return children;
};

interface TabsProps {
	initalTabIndex?: number;
	onChange?: (index: number) => void;
	tabs: TabProps[];
	children: string | ReactElement | ReactElement[];
}

const Tabs = ({ initalTabIndex = 0, onChange, tabs, children }: TabsProps) => {
	const [currentTabIndex, setCurrentTabIndex] = useState(initalTabIndex);
	const currentTabChildren = useMemo(() => {
		const currentTab = tabs[currentTabIndex];
		const children = currentTab?.children ?? tabs[0].children;

		return children;
	}, [currentTabIndex]);

	let contextValues: TabsContextProps = useMemo(
		() => ({
			currentTabIndex,
			onChange: (newIndex: number) => {
				setCurrentTabIndex(newIndex);

				if (onChange) {
					onChange(newIndex);
				}
			},
			tabs,
			children: currentTabChildren,
		}),
		[currentTabIndex, setCurrentTabIndex, tabs, currentTabChildren]
	);

	return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export { Tabs, TabsPanel, TabsCurrent };
