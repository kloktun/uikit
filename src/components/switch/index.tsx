import React from "react";
import { ControlsProps } from "../../common/controls.type";
import classNames from "classnames";

interface Props extends Pick<ControlsProps, "disabled"> {
	value: boolean;
	onChange: (status: boolean) => void;
}

const Switch = ({ value, onChange, disabled }: Props) => {
	const handleClick = () => {
		if (disabled) return;

		onChange(!value);
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				" kl-w-10 kl-h-10 kl-aspect-square kl-flex kl-flex-col kl-items-center kl-justify-center kl-flex-shrink kl-cursor-pointer",
				{
					"kl-opacity-50 kl-cursor-not-allowed": disabled,
				}
			)}
		>
			<div
				className={classNames(
					"kl-relative kl-w-10 kl-h-6 kl-rounded-full kl-transition-all kl-duration-300",
					{
						"kl-bg-primary": value,
						"kl-bg-stroke": !value,
					}
				)}
			>
				<div
					className={classNames(
						"kl-absolute kl-aspect-square kl-w-5 kl-h-5 kl-mt-0.5 kl-bg-background kl-rounded-full kl-transition-all kl-duration-300",
						{
							"kl-ml-[18px]": value,
							"kl-ml-0.5": !value,
						}
					)}
				></div>
			</div>
		</div>
	);
};

export default Switch;
