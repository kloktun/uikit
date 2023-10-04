import { hexToHsva, hsvaToHex } from "@uiw/react-color/esm";
import React from "react";
import { isHexColor } from "../../../utils/colors";

interface Props {
	color: string;
	showAlpha?: boolean;
}

const ColorPreview = ({ color, showAlpha = false }: Props) => {
	const hsvaColor = hexToHsva(isHexColor(color) ? color : "#ff0000");
	const colorWithoutAlpha = hsvaToHex(hsvaColor);

	return (
		<div className="kl-flex kl-flex-col kl-aspect-square kl-w-6 kl-h-6 kl-border kl-border-stroke kl-overflow-hidden kl-rounded-md">
			<div
				className="kl-w-full kl-flex-1"
				style={{
					backgroundColor: colorWithoutAlpha,
				}}
			></div>
			{showAlpha && (
				<div
					className="kl-w-full kl-flex-1"
					style={{
						backgroundColor: color,
					}}
				></div>
			)}
		</div>
	);
};

export default ColorPreview;
