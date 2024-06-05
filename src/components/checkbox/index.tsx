import classnames from "classnames";
import React, { createContext, useContext, useEffect, useMemo } from "react";

interface CheckboxGroupContext<T> {
	values: T[];
	onChange: (checked: boolean, value: T) => void;
	disabled?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContext<any>>({
	values: [],
	onChange: (checked, value) => {},
});

const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

export const CheckboxIndicator = ({
	status,
	className,
}: {
	status: boolean;
	className?: string;
}) => {
	if (status) {
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
					d="M8 2C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2H8ZM16.7884 8.24333C16.8798 8.28141 16.9628 8.3372 17.0325 8.4075C17.1086 8.47773 17.1694 8.56297 17.2109 8.65785C17.2525 8.75272 17.274 8.85517 17.274 8.95875C17.274 9.06233 17.2525 9.16478 17.2109 9.25965C17.1694 9.35453 17.1086 9.43977 17.0325 9.51L10.9125 15.63C10.8428 15.7003 10.7598 15.7561 10.6684 15.7942C10.577 15.8322 10.479 15.8518 10.38 15.8518C10.281 15.8518 10.183 15.8322 10.0916 15.7942C10.0002 15.7561 9.91722 15.7003 9.8475 15.63L6.9675 12.75C6.89511 12.6801 6.8372 12.5966 6.79708 12.5043C6.75696 12.412 6.73541 12.3126 6.73367 12.212C6.73193 12.1114 6.75003 12.0114 6.78693 11.9177C6.82384 11.8241 6.87882 11.7386 6.94875 11.6663C7.01868 11.5939 7.10218 11.536 7.19449 11.4958C7.2868 11.4557 7.38611 11.4342 7.48674 11.4324C7.58738 11.4307 7.68737 11.4488 7.78101 11.4857C7.87465 11.5226 7.96011 11.5776 8.0325 11.6475L10.38 14.0025L15.9675 8.4075C16.0372 8.3372 16.1202 8.28141 16.2116 8.24333C16.303 8.20526 16.401 8.18565 16.5 8.18565C16.599 8.18565 16.697 8.20526 16.7884 8.24333Z"
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
					d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4ZM8 2C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2H8Z"
					fill="currentColor"
				/>
			</svg>
		);
	}
};

interface CheckboxProps<T = unknown> {
	children:
		| string
		| React.ReactElement
		| ((checked?: boolean) => React.ReactElement);

	checked?: boolean;
	onChange?: (checked: boolean) => void;

	disabled?: boolean;

	value?: T;
}

export const Checkbox = ({
	children,
	checked,
	disabled,
	value,
	onChange,
}: CheckboxProps) => {
	const groupContext = useCheckboxGroupContext();

	const {
		values,
		onChange: groupOnChange,
		disabled: groupDisabled,
	} = groupContext;

	const status = useMemo(
		() => !!checked || values.includes(value),
		[checked, values]
	);
	const enabled = useMemo(
		() => !disabled && !groupDisabled,
		[disabled, groupDisabled]
	);

	useEffect(() => {
		if (status == checked) {
			return;
		}

		if (onChange) {
			onChange(status);
		}
	}, [status, checked]);

	useEffect(() => {
		if (status == values.includes(value)) {
			return;
		}

		if (groupOnChange) {
			groupOnChange(status, value);
		}
	}, [status, values]);

	const toggleChecked = () => {
		if (!enabled) {
			return;
		}

		if (onChange) {
			onChange(!status);
		}

		if (groupOnChange) {
			groupOnChange(!status, value);
		}
	};

	const el = () => {
		if (typeof children === "string") {
			return <>{children}</>;
		}

		if (typeof children === "function") {
			return children(status);
		}

		return children as React.ReactElement;
	};

	return (
		<div
			className={classnames(`kl-flex kl-flex-row kl-items-center kl-gap-2`, {
				"kl-opacity-50": !enabled,
				"kl-cursor-pointer": enabled,
			})}
			onClick={toggleChecked}
		>
			<CheckboxIndicator status={status} className="kl-text-primary" />

			<div className="kl-flex kl-flex-col kl-items-center">{el()}</div>
		</div>
	);
};

interface CheckboxGroupProps<T = unknown> {
	values: T[];
	onChange: (values: T[]) => void;

	children: JSX.Element | JSX.Element[];
	disabled?: boolean;
}

export const CheckboxGroup = <T = unknown,>({
	values,
	onChange,
	children,
	disabled,
}: CheckboxGroupProps<T>) => {
	const handleChange = (checked: boolean, value: T) => {
		const index = values.findIndex((item) => item == value);

		let newValues: T[] = [...values];

		// Add to list
		if (checked && index == -1) {
			newValues.push(value);
		}

		// Remove from list
		if (!checked && index > -1) {
			newValues.splice(index, 1);
		}

		onChange(newValues);
	};

	return (
		<CheckboxGroupContext.Provider
			value={{ values, onChange: handleChange, disabled }}
		>
			<div className="kl-flex kl-flex-col kl-gap-5">{children}</div>
		</CheckboxGroupContext.Provider>
	);
};
