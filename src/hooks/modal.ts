import { useState } from "react";
import { ModalProps } from "../components/modal";

export interface ModalState extends Pick<ModalProps, "show" | "onClose"> {
	open: () => void;
}

export const useModalState = (initalValue: boolean = false): ModalState => {
	const [show, setShow] = useState(initalValue);

	const open = () => setShow(true);
	const onClose = () => {
		setShow(false);
	};

	return {
		show,
		open,
		onClose,
	};
};
