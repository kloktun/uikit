import { ChangeEvent, useEffect, useState } from "react";
import Input from "../../input";
import ColorPreview from "./color-preview";
import React from "react";
import { isHexColor } from "../../../utils/colors";

interface Props {
	color: string;
	onChange: (value: string) => void;
}

const HexInput = ({ color, onChange }: Props) => {
	const [value, setValue] = useState(color);
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
	};

	useEffect(() => {
		setValue(color);
	}, [color]);

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const isEnter = e.key == "Enter";

		if (isEnter) {
			onSubmit();
		}
	};

	const onSubmit = () => {
		if (isHexColor(value)) {
			onChange(value);
		} else {
			setValue(color);
			onChange(color);
		}
	};

	return (
		<Input
			size="large"
			className="kl-flex-1 kl-w-full"
			prefixIcon={<ColorPreview color={color} />}
			value={value}
			htmlSize={9}
			maxLength={9}
			onChange={handleInputChange}
			onKeyUp={handleKeyUp}
			onBlur={onSubmit}
		/>
	);
};

export default HexInput;
