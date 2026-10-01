import {
	hexToHsva,
	HsvaColor,
	hsvaToHex,
	hsvaToHexa,
} from "@uiw/color-convert";
import Alpha from "@uiw/react-color-alpha";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import React, { useState } from "react";
import { isHexColor } from "../../../utils/colors";
import AlphaInput from "./alpha-input";
import HexInput from "./hex-input";

interface Props {
	color: string;
	onChange: (newColor: string) => void;
}

interface PalettePointerProps {
	left?: React.CSSProperties["left"];
	top?: React.CSSProperties["top"];
}

const ColorPickerPalettePointer = ({ left, top }: PalettePointerProps) => {
	const progressLeft = parseFloat(String(left ?? "100%")) / 100;
	const progressTop = parseFloat(String(top ?? "0%")) / 100;

	return (
		<div
			style={{
				left: left,
				top: top,
				transform: `translate(-${progressLeft * 100}%, -${progressTop * 100}%)`,
			}}
			className="kl:w-5 kl:h-5 kl:rounded-full kl:border-2 kl:border-white kl:shadow-modal kl:absolute kl:aspect-square"
		></div>
	);
};

const ColorPickerPalette = ({ color, onChange }: Props) => {
	const hsvaColor: HsvaColor = hexToHsva(isHexColor(color) ? color : "#ff0000");
	const [hue, setHue] = useState(hsvaColor.h);
	const [alpha, setAlpha] = useState(hsvaColor.a);

	const handleChange = (value: Partial<HsvaColor>) => {
		if (alpha == 1) {
			onChange(
				hsvaToHex({
					...hsvaColor,
					h: hue,
					a: alpha,
					...value,
				})
			);
			return;
		}

		onChange(
			hsvaToHexa({
				...hsvaColor,
				h: hue,
				a: alpha,
				...value,
			})
		);
	};

	return (
		<div className="kl:flex kl:flex-col kl:gap-5 kl:w-full kl:min-w-full">
			<Saturation
				className="kl:w-full kl:overflow-hidden kl:rounded-control kl:aspect-square"
				hsva={hsvaColor}
				onChange={handleChange}
				pointer={ColorPickerPalettePointer}
			/>
			<Hue
				className="kl:h-5 kl:rounded-full kl:overflow-hidden"
				hue={hue}
				pointer={ColorPickerPalettePointer}
				onChange={(value) => {
					setHue(value.h);
					handleChange(value);
				}}
			/>

			<Alpha
				className="kl:h-5 kl:rounded-full kl:overflow-hidden"
				hsva={hsvaColor}
				pointer={ColorPickerPalettePointer}
				onChange={(value) => {
					setAlpha(value.a);
					handleChange(value);
				}}
			/>

			<div className="kl:grid kl:grid-cols-1 kl:tablet:grid-cols-2 kl:gap-2">
				<HexInput color={color} onChange={onChange} />
				<AlphaInput color={color} onChange={onChange} />
			</div>
		</div>
	);
};

export default ColorPickerPalette;
