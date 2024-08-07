import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/outside";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

interface Props {
	button: JSX.Element | React.ReactNode | React.ReactElement;
	children: JSX.Element | React.ReactNode | React.ReactElement;

	show?: boolean;
	onClickOutside?: () => void;
}

// type ChildrenVerticalPosition = "top" | "bottom";
// type ChildrenHorizontalPosition = "left" | "right";

const isScrollable = (ele: HTMLElement | null) => {
	if (!ele) {
		return false;
	}

	const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

	const overflowYStyle = window.getComputedStyle(ele).overflowY;
	const isOverflowScroll = ["scroll", "auto"].includes(overflowYStyle);

	return hasScrollableContent && isOverflowScroll;
};

const getScrollableParent = (ele: HTMLElement | null): HTMLElement | null => {
	return ele
		? isScrollable(ele)
			? ele
			: getScrollableParent(ele.parentElement)
		: null;
};

const Dropdown = ({ button, children, show, onClickOutside }: Props) => {
	const selectRef = useRef<HTMLDivElement>(null);
	const parentEl = useMemo(
		() => getScrollableParent(selectRef.current),
		[selectRef.current]
	);

	const buttonRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const [verticalPosition, setVerticalPosition] = useState("bottom");
	const [horizontalPosition, setHorizontalPosition] = useState("left");
	const [buttonWidth, setButtonWidth] = useState(0);

	const updatePosition = () => {
		if (!childrenRef.current || !buttonRef.current) {
			return;
		}

		const buttonBounds = buttonRef.current.getBoundingClientRect();
		const listBounds = childrenRef.current.getBoundingClientRect();

		let parentRect = parentEl?.getBoundingClientRect();
		let viewportTop = parentRect?.top ?? 0;
		let viewportBottom = parentRect
			? viewportTop + parentRect.height
			: window.innerHeight;
		let viewportLeft = parentRect?.left ?? 0;
		let viewportRight = parentRect
			? viewportLeft + parentRect.width
			: window.innerWidth;

		if (viewportTop < 0) {
			viewportTop = 0;
		}

		if (viewportBottom > window.innerHeight) {
			viewportBottom = window.innerHeight;
		}

		if (viewportLeft < 0) {
			viewportLeft = 0;
		}

		if (viewportRight > window.innerWidth) {
			viewportRight = window.innerWidth;
		}

		const {
			top: buttonTop,
			bottom: buttonBottom,
			left: buttonLeft,
			right: buttonRight,
			width: buttonWidth,
		} = buttonBounds;
		const { width: listWidth, height: listHeight } = listBounds;

		const openTopPosition = buttonTop - listHeight;
		const openBottomPosition = buttonBottom + listHeight;

		const openLeftPosition = buttonLeft;
		const openRightPosition = buttonLeft + listWidth;

		const isOverTop = openTopPosition < viewportTop;
		const isOverBottom = openBottomPosition > viewportBottom;
		const isOverLeft = openLeftPosition < viewportLeft;
		const isOverRight = openRightPosition > viewportRight;

		const overTopValue = openTopPosition < 0 ? Math.abs(openTopPosition) : 0;
		const overBottomValue = openBottomPosition - viewportBottom;
		const overLeftValue = openLeftPosition < 0 ? Math.abs(openLeftPosition) : 0;
		const overRightvalue = openRightPosition - viewportRight;

		let newVerticalPosition = "bottom";
		let newHorizontalPostion = "left";

		if (isOverTop && isOverBottom) {
			if (overTopValue < overBottomValue) {
				newVerticalPosition = "top";
			} else {
				newVerticalPosition = "bottom";
			}
		} else if (isOverBottom) {
			newVerticalPosition = "top";
		} else {
			newVerticalPosition = "bottom";
		}

		if (isOverLeft && isOverRight) {
			if (overLeftValue < overRightvalue) {
				newHorizontalPostion = "right";
			} else {
				newHorizontalPostion = "left";
			}
		} else if (isOverRight) {
			newHorizontalPostion = "right";
		} else {
			newHorizontalPostion = "left";
		}

		setVerticalPosition(newVerticalPosition);
		setHorizontalPosition(newHorizontalPostion);
		setButtonWidth(buttonWidth);
	};

	const addEventListeners = () => {
		window.addEventListener("scroll", updatePosition);
		window.addEventListener("resize", updatePosition);
		parentEl?.addEventListener("scroll", updatePosition);
		parentEl?.addEventListener("resize", updatePosition);
	};

	const removeEventListeners = () => {
		window.removeEventListener("scroll", updatePosition);
		window.removeEventListener("resize", updatePosition);
		parentEl?.removeEventListener("scroll", updatePosition);
		parentEl?.removeEventListener("resize", updatePosition);
	};

	useEffect(() => {
		updatePosition();

		if (show) {
			addEventListeners();
		} else {
			removeEventListeners();
		}

		return () => {
			removeEventListeners();
		};
	}, [show]);

	useEffect(() => {
		updatePosition();
	}, []);

	useEffect(() => {
		setTimeout(updatePosition, 0);
	}, [show]);

	if (onClickOutside) {
		useClickOutside([buttonRef, childrenRef], onClickOutside, show);
	}

	return (
		<div className="kl-relative" ref={selectRef}>
			<div ref={buttonRef}>{button}</div>

			<Transition
				as={"div"}
				show={show}
				style={{
					minWidth: `${buttonWidth}px`,
				}}
				className={classNames("kl-absolute kl-z-[1]", {
					"kl-top-0": verticalPosition == "top",
					"kl-bottom-0": verticalPosition == "bottom",
					"kl-left-0": horizontalPosition == "left",
					"kl-right-0": horizontalPosition == "right",
				})}
				enter="kl-transform kl-transition kl-duration-200"
				enterFrom="kl-opacity-0 kl-scale-95"
				enterTo="kl-opacity-100 kl-scale-100"
				leave="kl-transform kl-transition kl-duration-200"
				leaveFrom="kl-opacity-100 kl-scale-100"
				leaveTo="kl-opacity-0 kl-scale-95"
			>
				<div
					className={classNames(
						"kl-absolute kl-overflow-hidden kl-flex kl-flex-col kl-border kl-border-stroke kl-bg-background kl-rounded-control kl-z-10 kl-min-w-full"
						// {
						// 	"kl-bottom-full kl-mb-2": verticalPosition == "top",
						// 	"kl-top-full kl-mt-2": verticalPosition == "bottom",
						// 	"kl-left-0": horizontalPosition == "left",
						// 	"kl-right-0": horizontalPosition == "right",
						// }
					)}
					ref={childrenRef}
				>
					{children}
				</div>
			</Transition>
		</div>
	);
};

export default Dropdown;
