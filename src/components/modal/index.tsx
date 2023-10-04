import React, { useRef } from "react";
import { OverlayChildrenProps } from "../overlay";
import IconButton from "../icon-button";
import CloseIcon from "../../icons/close-icon";
import Window from "../window";
import classnames from "classnames";

type ModalScrollType = "paper" | "body";

export interface ModalProps {
	children:
		| string
		| React.ReactElement
		| ((props: OverlayChildrenProps) => React.ReactElement);
	title?: string | React.ReactElement;

	show: boolean;
	onClose: () => void;

	scrollType?: ModalScrollType;
}

const Modal = ({
	children,
	title,
	show,
	scrollType = "paper",
	onClose,
}: ModalProps) => {
	const el = (props: OverlayChildrenProps) => {
		if (typeof children === "function") {
			return children(props);
		}

		return children as React.ReactElement;
	};

	const ref = useRef(null);

	return (
		<Window show={show} onClose={onClose}>
			{({ close }) => {
				return (
					<div
						className={classnames(
							"kl-flex kl-flex-col kl-bg-background kl-rounded-modal kl-shadow-modal kl-m-5",
							{
								"kl-max-h-full": scrollType == "paper",
								"kl-flex-1": scrollType == "body",
							}
						)}
					>
						{title && (
							<div className="kl-flex kl-flex-row kl-items-center kl-justify-between">
								<div className="kl-font-medium kl-text-xl kl-p-4 kl-mr-2">
									{title}
								</div>
								<div className="kl-p-1">
									<IconButton
										size="large"
										type="light-borderless"
										icon={<CloseIcon />}
										onClick={close}
									></IconButton>
								</div>
							</div>
						)}

						<div
							className={classnames(
								"kl-flex kl-flex-col kl-px-4 kl-pb-4 kl-flex-1 kl-overflow-y-auto ",
								{
									"kl-pt-4": !title,
								}
							)}
						>
							{el({ close })}
						</div>
					</div>
				);
			}}
		</Window>
	);
};

export default Modal;
