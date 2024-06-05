// Window.jsx
import React, { useEffect, useState } from "react";
import Overlay, { OverlayChildrenProps } from "../overlay";
import Backdrop from "../backdrop";
import classNames from "classnames";

export interface WindowProps {
	children:
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	show: boolean;
	onClose: <T>(result?: T) => void;
	onBackdropClick?: <T>(result?: T) => void;
}

const Window = ({ children, show, onClose, onBackdropClick }: WindowProps) => {
	const [isVisible, setIsVisible] = useState(show);

	useEffect(() => {
		if (show) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}, [show]);

	const handleOverlayVisibleChange = (visible: boolean) => {
		if (!visible) {
			onClose();
		}
	};

	const el = (props: OverlayChildrenProps) => {
		if (typeof children === "function") {
			return children(props);
		}

		return children as React.ReactElement;
	};

	return (
		<Overlay visible={isVisible} onVisibleChange={handleOverlayVisibleChange}>
			{({ close }) => (
				<Backdrop onClick={onBackdropClick ?? close}>
					<div
						className={classNames(
							"kl-flex kl-flex-col kl-my-auto kl-duration-150",
							show ? "kl-animate-fade-in-up" : "kl-animate-fade-out-down"
						)}
					>
						{el({ close })}
					</div>
				</Backdrop>
			)}
		</Overlay>
	);
};

export default Window;
