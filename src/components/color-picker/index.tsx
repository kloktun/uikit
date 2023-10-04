import React, { ReactElement, useMemo } from "react";
import ColorPickerForm from "./components/palette-form";
import Modal, { ModalProps } from "../modal";
import { useModalState } from "../../hooks/modal";

type Children = string | string[] | ReactElement | ReactElement[];
type ColorPickerChildren = (props: ColorPickerChildrenProps) => Children;

interface ColorPickerModalProps extends Pick<ModalProps, "title"> {
	okayButtonText: string;
}

export interface ColorPickerProps {
	value?: string;
	onChange: (value?: string) => void;
	children: Children | ColorPickerChildren;
	modal?: ColorPickerModalProps;
}

interface ColorPickerChildrenProps {
	color?: string;
	onChange: (value?: string) => void;
	pickColor: () => void;
	clearColor: () => void;
	hasColor: boolean;
}

const ColorPicker = (props: ColorPickerProps) => {
	const { value, onChange, children, modal } = props;
	const hasColor = useMemo(() => !!value, [value]);

	const modalState = useModalState();

	const pickColor = () => {
		modalState.open();
	};

	const clearColor = () => {
		onChange();
	};

	const childrenProps = useMemo<ColorPickerChildrenProps>(() => {
		return {
			color: value && value.length > 0 ? value : undefined,
			onChange,
			pickColor,
			clearColor,
			hasColor,
		};
	}, [value, hasColor]);

	const el = () => {
		if (typeof children === "function") {
			return children(childrenProps);
		}

		return children;
	};

	const handleSuibmit = (value?: string) => {
		onChange(value);
		modalState.onClose();
	};

	return (
		<>
			<Modal {...modalState} title={modal?.title}>
				<ColorPickerForm
					value={childrenProps.color}
					okayButtonText={modal?.okayButtonText}
					onSubmit={handleSuibmit}
				/>
			</Modal>

			{el()}
		</>
	);
};

export default ColorPicker;
