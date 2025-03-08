import React, { useCallback, useRef, useState } from "react";
import {
	useFloating,
	autoUpdate,
	flip,
	shift,
	offset,
	size,
	useTransitionStyles,
	useHover,
	safePolygon,
	useInteractions,
} from "@floating-ui/react";

import { Placement } from "../../common/controls.type";
import classNames from "classnames";

export interface HoverPopoverProps {
	button: React.ReactNode | JSX.Element;
	children: React.ReactNode | JSX.Element;
	placement?: Placement;
	className?: string;
	popoverClassName?: string;
	minPopoverSize?: "button";
	openDelay?: number;
	closeDelay?: number;
}

const HoverPopover = ({
	button,
	children,
	placement,
	className,
	popoverClassName,
	minPopoverSize,
	openDelay,
	closeDelay,
}: HoverPopoverProps) => {
	const buttonRef = useRef<HTMLDivElement>();
	const popoverRef = useRef<HTMLDivElement>();

	const [visible, setVisible] = useState<boolean>(false);

	const [minFloatingWidth, setMinFloatingWidth] = useState<number>(0);

	const { refs, floatingStyles, context } = useFloating({
		open: visible,
		onOpenChange: (state) => {
			setVisible(state);
		},
		placement: placement ?? "top",
		middleware: [
			offset(8),
			flip(),
			shift(),
			size({
				apply(data) {
					if (minPopoverSize === "button") {
						setMinFloatingWidth(data.rects.reference.width);
					}
				},
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const handleButtonRef = useCallback(
		(ref: HTMLDivElement) => {
			refs.setReference(ref);
			buttonRef.current = ref;
		},
		[refs]
	);

	const handleRef = useCallback(
		(ref: HTMLDivElement) => {
			refs.setFloating(ref);
			popoverRef.current = ref;
		},
		[refs]
	);

	const { isMounted, styles } = useTransitionStyles(context, {
		duration: 200,
		initial: {
			opacity: 0,
			transform: "scale(0.95)",
		},
		open: {
			opacity: 1,
			transform: "scale(1)",
		},
		close: {
			opacity: 0,
			transform: "scale(0.95)",
		},
	});

	const hover = useHover(context, {
		delay: {
			open: openDelay ?? 200,
			close: closeDelay ?? 1000,
		},
		handleClose: safePolygon(),
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

	return (
		<>
			<div className={className} ref={handleButtonRef} {...getReferenceProps()}>
				{button}
			</div>

			{isMounted && (
				<div
					ref={handleRef}
					style={{
						...floatingStyles,
						minWidth: `${minFloatingWidth}px`,
					}}
					{...getFloatingProps()}
					className={classNames("kl-z-[1]")}
				>
					<div style={styles} className={popoverClassName}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default HoverPopover;
