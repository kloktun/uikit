import classnames from "classnames";
import React, {
	Ref,
	SelectHTMLAttributes,
	createContext,
	forwardRef,
	useContext,
	useMemo,
	useState,
} from "react";
import { ControlSize, ControlsProps } from "../../common/controls.type";
import Dropdown from "../dropdown";
import Icon, { IconProp } from "../icon";

interface SelectContextProps<T> {
	value: T;
	options: SelectOptionData<T>[];
	size?: ControlSize;
	onChange: (value?: T) => void;
	compareKey?: keyof NonNullable<T>;
}

const SelectContext = createContext<SelectContextProps<any>>({
	value: null,
	options: [],
	size: "default",
	onChange: () => {},
});

const useSelectContext = () => useContext(SelectContext);

type SelectType = "default" | "primary" | "plain" | "borderless" | "text";

interface Props<T>
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "size" | "onChange">,
		ControlsProps {
	value: T;
	onChange?: (event: React.ChangeEvent<{ value: T }>) => void;
	type?: SelectType;
	children:
		| React.ReactElement
		| React.ReactElement[]
		| React.JSX.Element
		| React.JSX.Element[];
	placeholder?: string;
	icon?: IconProp;
	compareKey?: keyof NonNullable<T>;
}

const Select = forwardRef(function <T>(
	props: Props<T>,
	ref: Ref<HTMLSelectElement>
) {
	const { children, value, onChange, size, disabled, compareKey } = props;

	const [open, setOpen] = useState(false);

	const hide = () => {
		setOpen(false);
	};

	const toggle = () => {
		setOpen(!open);
	};

	const options = useMemo(() => {
		const optionComponents: React.ReactElement<SelectOptionProps<T>>[] = [];

		React.Children.forEach(children, (child) => {
			if (
				React.isValidElement<SelectOptionProps<T>>(child) &&
				child.type === SelectOption
			) {
				optionComponents.push(child);
				return;
			}
		});

		return optionComponents.map((comp) => {
			const data: SelectOptionProps<T> = { ...comp.props };

			if (!data.label) {
				data.label = comp.props.children;
			}

			return data;
		});
	}, [children]);

	const handleChange = (value: T) => {
		hide();

		if (onChange) {
			const event = {
				target: {
					value,
				},
			} as React.ChangeEvent<{ value: T }>;

			onChange(event);
		}
	};

	return (
		<SelectContext.Provider
			value={{ value, options, size, onChange: handleChange, compareKey }}
		>
			<Dropdown
				button={
					<SelectButton
						{...props}
						onClick={toggle}
						open={open}
						disabled={disabled}
					></SelectButton>
				}
				show={open}
				onClickOutside={hide}
				minPopoverSize="button"
			>
				<div
					className={classnames("kl:max-h-80 kl:overflow-y-auto", {
						"kl:py-3": size == "large",
						"kl:py-2.5": size == "medium",
						"kl:py-2": size == "default",
						"kl:py-1.5": size == "small" || size == "mini",
					})}
				>
					<div className="kl:flex kl:flex-col kl:h-full">{children}</div>
				</div>
			</Dropdown>
		</SelectContext.Provider>
	);
}) as <T>(
	props: Props<T> & { ref?: Ref<HTMLSelectElement> }
) => React.ReactElement;

interface SelectButtonProps<T> extends Omit<Props<T>, "value" | "children"> {
	open?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
}

export function SelectButton<T>({
	type = "default",
	size = "default",
	placeholder,
	icon,
	success,
	warning,
	error,
	disabled,
	onClick,
	open = false,
	className,
}: SelectButtonProps<T>) {
	const status = error
		? "error"
		: success
		? "success"
		: warning
		? "warning"
		: "default";

	const { value, options, compareKey } = useSelectContext();

	let content;

	let selected = useMemo(() => {
		let item = options.find((el) => {
			if (compareKey) {
				return el.value?.[compareKey] == value?.[compareKey];
			}

			return el.value == value;
		});

		return item;
	}, [value, options]);

	if (!selected) {
		content = (
			<span
				className={classnames("kl:select-none", {
					"kl:text-front-hint":
						type == "default" || type == "borderless" || type == "text",
				})}
			>
				{placeholder}
			</span>
		);
	} else {
		content = selected.label ?? selected.value;
	}

	const handleClick = () => {
		if (disabled || !onClick) {
			return;
		}

		onClick();
	};

	return (
		<div
			onClick={handleClick}
			className={classnames(
				"kl:rounded-control kl:flex kl:flex-row kl:items-center kl:justify-start kl:transition-all kl:duration-200 kl:max-h-full",
				type != "text"
					? {
							"kl:px-3": size == "large",
							"kl:px-2.5": size == "medium",
							"kl:px-2": size == "default",
							"kl:px-1.5": size == "small" || size == "mini",
					  }
					: null,
				{
					// Type
					"kl:border kl:bg-background  kl:hover:bg-background-hover kl:active:bg-background-active":
						type == "default",

					// Default state
					"kl:text-front kl:fill-front kl:border-stroke":
						status == "default" &&
						(type == "default" || type == "text" || type == "borderless"),
					"kl:text-primary-front kl:fill-primary-front kl:bg-primary kl:hover:bg-primary-accent-hover kl:active:bg-primary-accent-active":
						status == "default" && type == "primary",
					"kl:text-primary kl:fill-primary kl:bg-primary-plain  kl:hover:bg-primary-plain-hover kl:active:bg-primary-plain-active":
						status == "default" && type == "plain",

					// Error state
					"kl:text-error kl:fill-error kl:border-error kl:hover:bg-error-hover kl:active:bg-error-active":
						status == "error" && type == "default",
					"kl:text-error-front kl:fill-error-front kl:bg-error kl:hover:bg-error-accent-hover kl:active:bg-error-accent-active":
						status == "error" && type == "primary",
					"kl:text-error kl:fill-error kl:bg-error-plain kl:hover:bg-error-plain-hover kl:active:bg-error-plain-active":
						status == "error" && type == "plain",
					"kl:text-error kl:fill-error kl:hover:text-error-accent-hover kl:hover:fill-error-accent-hover kl:active:text-error-accent-active kl:active:fill-error-active":
						status == "error" && (type == "text" || type == "borderless"),

					// Warning state
					"kl:text-warning kl:fill-warning kl:border-warning kl:hover:bg-warning-hover kl:active:bg-warning-active":
						status == "warning" && type == "default",
					"kl:text-warning-front kl:fill-warning-front kl:bg-warning kl:hover:bg-warning-accent-hover kl:active:bg-warning-accent-active":
						status == "warning" && type == "primary",
					"kl:text-warning kl:fill-warning kl:bg-warning-plain kl:hover:bg-warning-plain-hover kl:active:bg-warning-plain-active":
						status == "warning" && type == "plain",
					"kl:text-warning kl:fill-warning kl:hover:text-warning-accent-hover kl:hover:fill-warning-accent-hover kl:active:text-warning-accent-active kl:active:fill-warning-active":
						status == "warning" && (type == "text" || type == "borderless"),

					// Success state
					"kl:text-success kl:fill-success kl:border-success kl:hover:bg-success-hover kl:active:bg-success-active":
						status == "success" && type == "default",
					"kl:text-success-front kl:fill-success-front kl:bg-success kl:hover:bg-success-accent-hover kl:active:bg-success-accent-active":
						status == "success" && type == "primary",
					"kl:text-success kl:fill-success kl:bg-success-plain kl:hover:bg-success-plain-hover kl:active:bg-success-plain-active":
						status == "success" && type == "plain",
					"kl:text-success kl:fill-success kl:hover:text-success-accent-hover kl:hover:fill-success-accent-hover kl:active:text-success-accent-active kl:active:fill-success-active":
						status == "success" && (type == "text" || type == "borderless"),

					// Size
					"kl:control-height-large": type != "text" && size == "large",
					"kl:control-height-medium": type != "text" && size == "medium",
					"kl:control-height-default": type != "text" && size == "default",
					"kl:control-height-small": type != "text" && size == "small",
					"kl:control-height-mini": type != "text" && size == "mini",

					"kl:gap-3": size == "large",
					"kl:gap-2.5": size == "medium",
					"kl:gap-2": size == "default",
					"kl:gap-1.5": size == "small" || size == "mini",

					// Disabled
					"kl:cursor-not-allowed kl:opacity-50": disabled,

					"kl:cursor-pointer": !disabled,
				},
				className
			)}
		>
			{(icon || selected?.icon) && (
				<div
					className={classnames({
						"kl:text-front-hint kl:fill-front-hint":
							status == "default" &&
							(type == "default" || type == "borderless" || type == "text"),
					})}
				>
					<Icon icon={selected?.icon ?? icon} size={size} />
				</div>
			)}

			<div className="kl:flex kl:flex-1 kl:flex-row kl:items-center kl:justify-start kl:overflow-hidden kl:text-ellipsis kl:whitespace-nowrap">
				{content}
			</div>

			<div
				className={classnames("kl:transition-all", {
					"kl:rotate-180": open,
					"kl:text-front-hint kl:fill-front-hint":
						status == "default" &&
						(type == "default" || type == "borderless" || type == "text"),
				})}
			>
				<Icon
					size={size}
					icon={
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 9.17019C16.8126 8.98394 16.5592 8.87939 16.295 8.87939C16.0308 8.87939 15.7774 8.98394 15.59 9.17019L12 12.7102L8.46001 9.17019C8.27265 8.98394 8.0192 8.87939 7.75501 8.87939C7.49082 8.87939 7.23737 8.98394 7.05001 9.17019C6.95628 9.26315 6.88189 9.37375 6.83112 9.49561C6.78035 9.61747 6.75421 9.74818 6.75421 9.88019C6.75421 10.0122 6.78035 10.1429 6.83112 10.2648C6.88189 10.3866 6.95628 10.4972 7.05001 10.5902L11.29 14.8302C11.383 14.9239 11.4936 14.9983 11.6154 15.0491C11.7373 15.0998 11.868 15.126 12 15.126C12.132 15.126 12.2627 15.0998 12.3846 15.0491C12.5064 14.9983 12.617 14.9239 12.71 14.8302L17 10.5902C17.0937 10.4972 17.1681 10.3866 17.2189 10.2648C17.2697 10.1429 17.2958 10.0122 17.2958 9.88019C17.2958 9.74818 17.2697 9.61747 17.2189 9.49561C17.1681 9.37375 17.0937 9.26315 17 9.17019Z" />
						</svg>
					}
				/>
			</div>
		</div>
	);
}

type SelectLabel =
	| "string"
	| React.JSX.Element
	| React.ReactElement
	| React.ReactNode;

interface SelectOptionData<T> {
	value: T;
	icon?: IconProp;
	label?: SelectLabel;
}

interface SelectOptionProps<T> extends SelectOptionData<T> {
	children?: SelectLabel;
	disabled?: boolean;
}

const SelectOption = <T = unknown,>(props: SelectOptionProps<T>) => {
	const {
		value: selectValue,
		onChange,
		size = "default",
		compareKey,
	} = useSelectContext();

	let { value, icon, label, children, disabled } = props;

	const selected = useMemo(() => {
		if (compareKey && value && selectValue) {
			return (value as any)[compareKey] == (selectValue as any)[compareKey];
		}

		return value == selectValue;
	}, [value, selectValue]);

	if (!children) {
		label = children;
	}

	const handleClick = () => {
		if (disabled) {
			return;
		}

		onChange(value);
	};

	return (
		<div
			className={classnames(
				"kl:flex kl:flex-row kl:items-center kl:hover:bg-primary-plain",
				{
					"kl:text-primary kl:fill-primary kl:font-medium": selected,

					"kl:px-3 kl:gap-3": size == "large",
					"kl:px-2.5 kl:gap-2.5": size == "medium",
					"kl:px-2 kl:gap-2": size == "default",
					"kl:px-1.5 kl:gap-1.5": size == "small" || size == "mini",

					// Size
					"kl:control-height-large": size == "large",
					"kl:control-height-medium": size == "medium",
					"kl:control-height-default": size == "default",
					"kl:control-height-small": size == "small",
					"kl:control-height-mini": size == "mini",

					// Disabled
					"kl:cursor-not-allowed kl:opacity-50": disabled,

					"kl:cursor-pointer": !disabled,
				}
			)}
			onClick={handleClick}
		>
			<Icon icon={icon} size={size} />

			{children}
		</div>
	);
};

export { Select, SelectOption };
