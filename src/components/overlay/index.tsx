import React, { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import { CurrentOverlayContext, useOverlayContext } from "./context";
import { OVERLAY_CONTAINER_ID } from "./constaints";

type VisibleChangeFunction = (visible: boolean) => void;
export type CloseFunction = <T>(result?: T) => void;

export interface OverlayChildrenProps {
	close: CloseFunction;
}

interface Props {
	children:
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	visible?: boolean;

	onVisibleChange?: VisibleChangeFunction;
}

const OverlayChildren = (props: Props) => {
	const { children, onVisibleChange } = props;

	const close = () => {
		if (!onVisibleChange) {
			return;
		}

		onVisibleChange(false);
	};

	const el = () => {
		if (typeof children === "function") {
			return children({ close });
		}

		return children as React.ReactElement;
	};

	return (
		<div
			className={classnames(
				"kl-flex kl-flex-col kl-fixed kl-top-0 kl-left-0 kl-bottom-0 kl-right-0"
			)}
		>
			{el()}
		</div>
	);
};

const Overlay = (props: Props): React.ReactElement | null => {
	const overlayContext = useOverlayContext();
	// The same for the overlay's whole life: its content knows which overlay
	// it's in
	const id = useId();

	useEffect(() => {
		if (props.visible) {
			overlayContext.show(id);
		} else {
			overlayContext.close(id);
		}

		return () => {
			overlayContext.close(id);
		};
	}, [props.visible]);

	if (props.visible) {
		return (
			<>
				{createPortal(
					<CurrentOverlayContext.Provider value={id}>
						<OverlayChildren {...props}></OverlayChildren>
					</CurrentOverlayContext.Provider>,
					document.getElementById(OVERLAY_CONTAINER_ID)!
				)}
			</>
		);
	} else {
		return null;
	}
};

export default Overlay;
