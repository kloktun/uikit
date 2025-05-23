import classnames from "classnames";
import React, { createContext, useContext, useMemo } from "react";
import { ControlStatusProps } from "../../common/controls.type";

type RadioIndicatorAligment = "start" | "end";

interface RadioContextProps<T> extends ControlStatusProps {
	value?: T;
	onChange: (value?: T) => void;
	disabled?: boolean;
	indicatorAligment?: RadioIndicatorAligment;
	customIndicator?:
		| React.ReactElement
		| ((status?: boolean) => React.ReactElement);
}

const RadioContext = createContext<RadioContextProps<any>>({
	onChange: () => {},
});

const useRadioGroupContext = () => useContext(RadioContext);

interface PropsGroup<T> extends ControlStatusProps {
	value: T;
	onChange: (value: T) => void;
	children: JSX.Element | JSX.Element[];
	disabled?: boolean;
	indicatorAligment?: RadioIndicatorAligment;
	customIndicator?:
		| React.ReactElement
		| ((status?: boolean) => React.ReactElement);
}

export function RadioGroup<T>({
	value,
	onChange,
	children,
	disabled,
	indicatorAligment,
	customIndicator,
	success,
	error,
	warning,
}: PropsGroup<T>) {
	return (
		<RadioContext.Provider
			value={{
				value,
				onChange,
				disabled,
				indicatorAligment,
				customIndicator,
				success,
				error,
				warning,
			}}
		>
			<div className={classnames("kl-flex kl-flex-col kl-gap-5")}>
				{children}
			</div>
		</RadioContext.Provider>
	);
}

interface PropsOption<T> extends ControlStatusProps {
	value: T;
	children:
		| string
		| React.ReactElement
		| ((selected?: boolean) => React.ReactElement);
	suffix?:
		| string
		| React.ReactElement
		| React.ReactNode
		| ((selected?: boolean) => React.ReactElement | React.ReactNode);
	disabled?: boolean;
	indicatorAligment?: RadioIndicatorAligment;
	customIndicator?:
		| React.ReactElement
		| ((status?: boolean) => React.ReactElement);
}

export const RadioIndicator = ({
	enabled = false,
	className,
}: {
	enabled?: boolean;
	className?: string;
}) => {
	if (enabled) {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				className={className}
			>
				<path
					d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
					fill="currentColor"
				/>
				<path
					d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
					fill="currentColor"
				/>
			</svg>
		);
	} else {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				className={className}
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
					fill="currentColor"
				/>
			</svg>
		);
	}
};

export function RadioOption<T>({
	value,
	children,
	disabled,
	suffix,
	indicatorAligment: optionIndicatorAligment,
	customIndicator: optionCustomIndicator,
	success,
	error,
	warning,
}: PropsOption<T>) {
	const {
		value: currentValue,
		onChange,
		disabled: groupDisabled,
		indicatorAligment: groupIndicatorAligment,
		customIndicator: groupCustomIndicator,
		success: groupSuccess,
		error: groupError,
		warning: groupWarning,
	} = useRadioGroupContext();

	const isSuccess = success || groupSuccess;
	const isError = error || groupError;
	const isWarning = warning || groupWarning;

	const indicatorAligment: RadioIndicatorAligment =
		optionIndicatorAligment || groupIndicatorAligment || "start";

	const customIndicator = optionCustomIndicator || groupCustomIndicator;

	const selected = useMemo(() => currentValue == value, [currentValue, value]);
	const enabled = useMemo(
		() => !disabled && !groupDisabled,
		[disabled, groupDisabled]
	);

	const handleClick = () => {
		if (!enabled) {
			return;
		}

		onChange(value);
	};

	const el = (elChildren: typeof children | typeof suffix) => {
		if (typeof elChildren === "string") {
			return <>{elChildren}</>;
		}

		if (typeof elChildren === "function") {
			return elChildren(currentValue == value);
		}

		return elChildren as React.ReactElement;
	};

	return (
		<div
			className={classnames(`kl-flex kl-flex-row kl-items-center kl-gap-2`, {
				"kl-opacity-50": !enabled,
				"kl-cursor-pointer": enabled,
			})}
			onClick={handleClick}
		>
			{indicatorAligment == "start" &&
				(customIndicator ? (
					typeof customIndicator === "function" ? (
						customIndicator(selected)
					) : (
						customIndicator
					)
				) : (
					<RadioIndicator
						enabled={selected}
						className={classnames("kl-flex-shrink-0", {
							"kl-text-primary": !isSuccess && !isError && !isWarning,
							"kl-text-success": isSuccess,
							"kl-text-error": isError,
							"kl-text-warning": isWarning,
						})}
					/>
				))}

			<div className="kl-flex kl-flex-row kl-items-center kl-flex-1 kl-gap-2">
				<div className="kl-flex-1">{el(children)}</div>
				{suffix && <div className="kl-flex">{el(suffix)}</div>}
			</div>

			{indicatorAligment == "end" &&
				(customIndicator ? (
					typeof customIndicator === "function" ? (
						customIndicator(selected)
					) : (
						customIndicator
					)
				) : (
					<RadioIndicator
						enabled={selected}
						className={classnames("kl-flex-shrink-0", {
							"kl-text-primary": !isSuccess && !isError && !isWarning,
							"kl-text-success": isSuccess,
							"kl-text-error": isError,
							"kl-text-warning": isWarning,
						})}
					/>
				))}
		</div>
	);
}
