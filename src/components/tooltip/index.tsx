import React from "react";

import HoverPopover, { HoverPopoverProps } from "../hover-popover";

interface Props
	extends Pick<
		HoverPopoverProps,
		"className" | "placement" | "openDelay" | "closeDelay"
	> {
	children: React.ReactNode | React.JSX.Element;
	content: React.ReactNode | React.JSX.Element;
}

const Tooltip = ({ content, children, ...restProps }: Props) => {
	return (
		<HoverPopover
			popoverClassName="kl:flex kl:flex-col kl:bg-black/70 kl:backdrop-blur-xs kl:text-white kl:px-2.5 kl:py-1 kl:rounded-control"
			button={children}
			{...restProps}
		>
			{content}
		</HoverPopover>
	);
};

export default Tooltip;
