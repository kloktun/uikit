import { useState } from "react";
import ColorPickerPalette from "./palette";
import React from "react";
import Button from "../../button";

interface Props {
	value?: string;
	onSubmit: (value: string) => void;
	okayButtonText?: string;
}

const ColorPickerForm = ({ value, onSubmit, okayButtonText }: Props) => {
	const [color, setColor] = useState(value ?? "#ff0000");
	const handleSubmit = () => {
		onSubmit(color);
	};

	return (
		<div className="kl-flex kl-w-full kl-flex-col kl-gap-4">
			<ColorPickerPalette color={color} onChange={setColor} />
			<Button type="primary" onClick={handleSubmit}>
				{okayButtonText}
			</Button>
		</div>
	);
};

export default ColorPickerForm;
