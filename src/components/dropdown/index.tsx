import React from "react";

import Popover, { PopoverProps } from "../popover";

interface Props extends Omit<PopoverProps, "popoverClassName"> {}

const Dropdown = (props: Props) => {
	return (
		<Popover
			{...props}
			popoverClassName="kl-flex kl-flex-col kl-border kl-border-stroke kl-bg-background kl-rounded-control kl-overflow-hidden"
		/>
	);
};

export default Dropdown;
