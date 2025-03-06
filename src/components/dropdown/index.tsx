import React, { useCallback, useRef, useState } from "react";
import {
	useFloating,
	autoUpdate,
	flip,
	shift,
	offset,
} from "@floating-ui/react";

import { useClickOutside } from "../../hooks/outside";
import { Transition } from "@headlessui/react";

interface Props {
	button: React.ReactNode | JSX.Element;
	children: React.ReactNode | JSX.Element;
	show?: boolean;
	onClickOutside?: () => void;
}

const Dropdown = ({ button, children, show, onClickOutside }: Props) => {
	const buttonRef = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const { refs, floatingStyles } = useFloating({
		open: show,
		placement: "bottom-start", // Можно менять на top, right, left
		middleware: [offset(8), flip(), shift()],
		whileElementsMounted: autoUpdate,
	});

	const handleClickOutside = useCallback(() => {
		onClickOutside?.();
	}, [onClickOutside]);

	useClickOutside([buttonRef, popoverRef], handleClickOutside, show);

	return (
		<div className="kl-relative" ref={refs.setReference}>
			<div ref={buttonRef}>{button}</div>

			<Transition
				as={"div"}
				ref={popoverRef}
				show={show}
				className="kl-absolute kl-z-[1]"
				enter="kl-transform kl-transition kl-duration-200"
				enterFrom="kl-opacity-0 kl-scale-95"
				enterTo="kl-opacity-100 kl-scale-100"
				leave="kl-transform kl-transition kl-duration-200"
				leaveFrom="kl-opacity-100 kl-scale-100"
				leaveTo="kl-opacity-0 kl-scale-95"
			>
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className="kl-absolute kl-overflow-hidden kl-flex kl-flex-col kl-border kl-border-stroke kl-bg-background kl-rounded-control kl-z-10 kl-min-w-full"
				>
					{children}
				</div>
			</Transition>
		</div>
	);
};

export default Dropdown;
