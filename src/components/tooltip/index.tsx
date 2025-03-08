import React from "react";

import Popover, { PopoverProps } from "../popover";
import HoverPopover, { HoverPopoverProps } from "../hover-popover";

interface Props
	extends Pick<
		HoverPopoverProps,
		"className" | "placement" | "openDelay" | "closeDelay"
	> {
	children: React.ReactNode | JSX.Element;
	content: React.ReactNode | JSX.Element;
}

const Tooltip = ({ content, children, ...restProps }: Props) => {
	return (
		<HoverPopover
			popoverClassName="kl-flex kl-flex-col kl-bg-black kl-bg-opacity-70 kl-backdrop-blur-sm kl-text-white kl-px-2.5 kl-py-1 kl-rounded-control"
			button={children}
			{...restProps}
		>
			{content}
		</HoverPopover>
	);
};

export default Tooltip;
