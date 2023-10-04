import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";
import Input, { InputProps } from "../input";
import { isHexColor } from "../../utils/colors";
import { ControlSize } from "../../common/controls.type";
import Icon from "../icon";
import ColorPicker, { ColorPickerProps } from "../color-picker";
import IconButton from "../icon-button";
import CloseIcon from "../../icons/close-icon";
import Button, { ButtonProps } from "../button";

interface InputColorPickerPreviewProps {
	color?: string;
	onClick?: () => void;
}

const InputColorPickerPreview = ({
	color,
	onClick,
}: InputColorPickerPreviewProps) => {
	return (
		<div
			onClick={onClick}
			className="kl-aspect-square kl-w-full kl-h-full kl-rounded-md kl-border kl-border-stroke kl-cursor-pointer"
			style={{ backgroundColor: color }}
		></div>
	);
};

interface Props extends Omit<InputProps, "onChange"> {
	onChange: (value?: string) => void;
	pickButton?: ButtonProps;
	modal?: ColorPickerProps["modal"];
}

const InputColorPicker = (props: Props) => {
	const { value, onChange, pickButton, modal } = props;

	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const isEnter = e.key == "Enter";

		if (isEnter) {
			onSubmit();
		}
	};

	const onSubmit = () => {
		if (!inputValue || !value) {
			handleOnChange();
			return;
		}

		if (isHexColor(inputValue)) {
			handleOnChange(inputValue);
		} else {
			handleOnChange(value);
		}
	};

	const handleOnChange = (value?: string) => {
		if (!value) {
			onChange("");
			setInputValue("");
			return;
		}

		onChange(value);
		setInputValue(value);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (props.onBlur) {
			props.onBlur(e);
		}
		onSubmit();
	};

	return (
		<ColorPicker value={value} onChange={handleOnChange} modal={modal}>
			{({ pickColor, clearColor, color, hasColor }) =>
				hasColor ? (
					<Input
						{...props}
						ref={undefined}
						prefixIcon={
							<InputColorPickerPreview color={color} onClick={pickColor} />
						}
						value={inputValue}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
						onBlur={handleBlur}
						htmlSize={10}
						maxLength={9}
						suffix={
							hasColor ? (
								<IconButton
									type="light-borderless"
									onClick={clearColor}
									size={props.size}
									icon={<CloseIcon />}
								/>
							) : undefined
						}
					/>
				) : (
					<Button
						{...pickButton}
						size={props.size}
						onClick={pickColor}
						error={props.error}
						warning={props.warning}
						success={props.success}
					/>
				)
			}
		</ColorPicker>
	);
};

export default InputColorPicker;
