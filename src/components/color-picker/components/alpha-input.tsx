import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Input from "../../input";
import ColorPreview from "./color-preview";
import React from "react";
import { isHex, isHexColor } from "../../../utils/colors";
import {
	hexToHsva,
	hsvaStringToHsva,
	hsvaToHex,
	hsvaToHexa,
} from "@uiw/react-color/esm";

interface Props {
	color: string;
	onChange: (value: string) => void;
}

const AlphaInput = ({ color, onChange }: Props) => {
	const hsva = hexToHsva(isHexColor(color) ? color : "#ff0000");

	const [alpha, setAlpha] = useState(hsva.a);
	const [value, setValue] = useState(`${hsva.a * 100}`);

	const updateAlpha = (a: number) => {
		console.log(a);

		if (a < 0) {
			a = 0;
		} else if (a > 1) {
			a = 1;
		}

		let newAlpha = Math.round(a * 100);
		setValue(`${newAlpha}`);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
	};

	useEffect(() => {
		setAlpha(hsva.a);
	}, [hsva]);

	useEffect(() => {
		updateAlpha(alpha);
	}, [alpha]);

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const isEnter = e.key == "Enter";
		const isUp = e.key == "ArrowUp";
		const isDown = e.key == "ArrowDown";

		if (isEnter) {
			onSubmit();
		}

		if (isUp) {
			increment();
		}

		if (isDown) {
			decrement();
		}
	};

	const increment = () => {
		setAlpha((a) => {
			let newAlpha = a + 0.01;

			if (newAlpha > 1) {
				newAlpha = 1;
			}

			return newAlpha;
		});
	};

	const decrement = () => {
		setAlpha((a) => {
			let newAlpha = a - 0.01;

			if (newAlpha < 0) {
				newAlpha = 0;
			}

			return newAlpha;
		});
	};

	const onSubmit = () => {
		let newValue = parseInt(value);

		if (isNaN(newValue) || newValue > 100) {
			newValue = 100;
		} else if (newValue < 0) {
			newValue = 0;
		}

		updateAlpha(newValue / 100);

		let newColor = hsvaToHexa({
			...hexToHsva(color),
			a: newValue / 100,
		});

		if (newValue == 100) {
			newColor = hsvaToHex({
				...hexToHsva(color),
				a: newValue / 100,
			});
		}

		onChange(newColor);
	};

	return (
		<Input
			size="large"
			className="kl-flex-1 kl-w-full"
			prefixIcon={<ColorPreview color={color} showAlpha />}
			value={value}
			htmlSize={3}
			maxLength={3}
			onChange={handleInputChange}
			onKeyUp={handleKeyUp}
			onBlur={onSubmit}
			suffixText="%"
		/>
	);
};

export default AlphaInput;
