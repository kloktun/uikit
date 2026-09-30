import {
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useFloating,
	useTransitionStyles,
} from "@floating-ui/react";
import React, { useCallback, useRef, useState } from "react";

import classNames from "classnames";
import { Placement } from "../../common/controls.type";
import { useClickOutside } from "../../hooks/outside";

export interface PopoverProps {
	button: React.ReactNode | React.JSX.Element;
	children: React.ReactNode | React.JSX.Element;
	show?: boolean;
	placement?: Placement;
	onClickOutside?: () => void;
	className?: string;
	popoverClassName?: string;
	minPopoverSize?: "button";
}

const Popover = ({
	button,
	children,
	show,
	onClickOutside,
	placement,
	className,
	popoverClassName,
	minPopoverSize,
}: PopoverProps) => {
	const buttonRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const [minFloatingWidth, setMinFloatingWidth] = useState<number>(0);

	const { refs, floatingStyles, context } = useFloating({
		open: show,
		placement: placement ?? "bottom-start",
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

	const handleClickOutside = useCallback(() => {
		onClickOutside?.();
	}, [onClickOutside]);

	useClickOutside([buttonRef, popoverRef], handleClickOutside, show);

	const handleButtonRef = useCallback(
		(ref: HTMLDivElement | null) => {
			refs.setReference(ref);
			buttonRef.current = ref;
		},
		[refs]
	);

	const handleRef = useCallback(
		(ref: HTMLDivElement | null) => {
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

	return (
		<>
			<div className={className} ref={handleButtonRef}>
				{button}
			</div>

			{isMounted && (
				<div
					ref={handleRef}
					style={{
						...floatingStyles,
						minWidth: `${minFloatingWidth}px`,
					}}
					className={classNames("kl:z-[1]")}
				>
					<div style={styles} className={popoverClassName}>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default Popover;
