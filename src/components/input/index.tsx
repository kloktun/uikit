import React, { forwardRef, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { ControlSize, ControlsProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";
import IconButton from "../icon-button";
import EyeIcon from "../../icons/eye-icon";
import EyeSlashIcon from "../../icons/eye-slash-icon";
import CloseIcon from "../../icons/close-icon";
import { useCombinedRefs } from "../../hooks/combinedrefs";

type PropPrependAppend = string | React.ReactElement;

export interface InputProps
	extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "prefix">,
		ControlsProps {
	value?: string;
	onDebounce?: (value: string) => void;

	debounceTimeout?: number;

	prepend?: PropPrependAppend;

	prefix?: string | React.ReactElement;
	prefixIcon?: IconProp;
	prefixText?: string;
	prefixPlaceholder?: string;

	suffixPlaceholder?: string;
	suffixText?: string;
	suffixIcon?: IconProp;
	suffix?: string | React.ReactElement;

	append?: PropPrependAppend;

	clearable?: boolean;
	togglePassword?: boolean;
	htmlSize?: number;
}

const InputIcon = ({
	icon,
	size,
	focus,
	success,
	error,
	warning,
	onClick,
}: {
	icon?: IconProp;
	focus: boolean;
	onClick?: () => void;
} & ControlsProps) => {
	if (!icon) {
		return null;
	}

	return (
		<div
			onClick={onClick}
			className={classnames("kl-cursor-text", {
				"kl-text-front-hint kl-fill-front-hint": !focus,
				"kl-text-primary kl-fill-primary": focus,
				"kl-text-error kl-fill-error": error,
				"kl-text-warning kl-fill-warning": warning,
				"kl-text-success kl-fill-success": success,
			})}
		>
			<Icon size={size} icon={icon}></Icon>
		</div>
	);
};

const InputPrefixSuffix = ({
	children,
	onClick,
}: {
	children?: string;
	onClick?: () => void;
}) => {
	if (!children || children.length == 0) {
		return null;
	}

	return (
		<div
			onClick={onClick}
			className="kl-text-front-hint kl-flex kl-flex-row kl-items-center kl-max-h-full kl-min-h-full kl-h-full kl-cursor-text control-inject"
		>
			{children}
		</div>
	);
};

const InputPrefixSuffixPlaceholder = InputPrefixSuffix;
const InputPrefixSuffixText = InputPrefixSuffix;

const InputPrependAppend = ({
	children,
	type,
	focus,
}: {
	children?: PropPrependAppend;
	type: "prepend" | "append";
	focus: boolean;
}) => {
	if (!children || (typeof children === "string" && children.length == 0)) {
		return null;
	}

	return (
		<div
			className={classnames(
				"kl-flex kl-flex-row kl-max-h-full kl-min-h-full kl-h-full kl-items-center kl-transition-all",
				{
					"kl-border-r": type == "prepend",
					"kl-border-l": type == "append",

					"kl-border-stroke": !focus,
					"kl-border-primary": focus,
				}
			)}
		>
			{children}
		</div>
	);
};

interface InputPasswordToggleButtonProps {
	show: boolean;
	onChange: (status: boolean) => void;
	size: ControlSize;
}

const InputPasswordToggleButton = ({
	show,
	size,
	onChange,
}: InputPasswordToggleButtonProps) => {
	const toggle = () => {
		onChange(!show);
	};

	return (
		<IconButton
			size={size}
			type="primary-borderless"
			icon={show ? <EyeIcon /> : <EyeSlashIcon />}
			onClick={toggle}
		></IconButton>
	);
};

interface InputClearButtonProps {
	onClear: () => void;
	size: ControlSize;
}

const InputClearButton = ({ size, onClear }: InputClearButtonProps) => {
	return (
		<IconButton
			size={size}
			type="primary-borderless"
			icon={<CloseIcon />}
			onClick={onClear}
		></IconButton>
	);
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			value,
			onChange,
			onDebounce,
			debounceTimeout = 200,
			size = "default",
			disabled,
			success,
			warning,
			error,
			prepend,
			prefix,
			prefixIcon,
			prefixText,
			prefixPlaceholder,
			suffixPlaceholder,
			suffixText,
			suffixIcon,
			suffix,
			append,
			clearable,
			togglePassword,
			type,
			htmlSize,
			...restProps
		},
		ref: React.Ref<HTMLInputElement>
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			if (onChange) {
				onChange(e);
			}

			handleDebounce(value);
		};

		let debounceTimer = useRef<NodeJS.Timer>();

		const handleDebounce = (value: string) => {
			if (!onDebounce) {
				return;
			}

			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}

			debounceTimer.current = setTimeout(() => {
				onDebounce(value);
			}, debounceTimeout);
		};

		const inputZeroPaddingLeft =
			prefixPlaceholder && prefixPlaceholder.length > 0;
		const inputZeroPaddingRight =
			suffixPlaceholder && suffixPlaceholder.length > 0;

		const inputEl = useRef<HTMLInputElement>(null);
		const combinedRef = useCombinedRefs<HTMLInputElement>(inputEl, ref);

		const focusInput = () => inputEl.current?.focus();

		const [focus, setFocus] = useState(false);

		const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
			setFocus(true);
			if (restProps?.onFocus) {
				restProps?.onFocus(e);
			}
		};
		const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
			setFocus(false);
			if (restProps?.onBlur) {
				restProps?.onBlur(e);
			}
		};

		const isTogglePasswordButtonVisible = togglePassword && type == "password";

		const [currentType, setCurrentType] = useState(type);
		const isPasswordVisible = useMemo(
			() => currentType != "password",
			[currentType]
		);

		const onChangePasswordVisibility = (show: boolean) => {
			setCurrentType(show ? "text" : "password");
		};

		const isClearButtonVisible = useMemo(() => {
			return value != null && value.length > 0 && clearable;
		}, [value, clearable]);
		const clear = () => {
			if (inputEl.current) {
				inputEl.current.value = "";
				inputEl.current.dispatchEvent(new Event("change"));
			}
		};

		return (
			<div
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={classnames(
					restProps.className,
					"editable-control-border editable-control-background kl-flex kl-flex-row kl-items-center kl-outline-none kl-ring-0",
					{
						success: success,
						error: error,
						warning: warning,
						"kl-opacity-50": disabled,

						// Size
						"control-height-large": size == "large",
						"control-height-medium": size == "medium",
						"control-height-default": size == "default",
						"control-height-small": size == "small",
						"control-height-mini": size == "mini",
					}
				)}
			>
				<InputPrependAppend type="prepend" focus={focus}>
					{prepend}
				</InputPrependAppend>

				{prefix}

				<div
					className={classnames(
						"kl-flex kl-flex-row kl-gap-3 kl-flex-1 kl-items-center kl-max-h-full kl-min-h-full kl-h-full",
						{
							"kl-pl-2": size == "mini" && !inputZeroPaddingLeft,
							"kl-pr-2": size == "mini" && !inputZeroPaddingRight,

							"kl-pl-2.5": size == "small" && !inputZeroPaddingRight,
							"kl-pr-2.5": size == "small" && !inputZeroPaddingRight,

							"kl-pl-3": size == "default" && !inputZeroPaddingRight,
							"kl-pr-3": size == "default" && !inputZeroPaddingRight,

							"kl-pl-3.5": size == "medium" && !inputZeroPaddingRight,
							"kl-pr-3.5": size == "medium" && !inputZeroPaddingRight,

							"kl-pl-4": size == "large" && !inputZeroPaddingRight,
							"kl-pr-4": size == "large" && !inputZeroPaddingRight,
						}
					)}
				>
					<InputIcon
						icon={prefixIcon}
						focus={focus}
						size={size}
						onClick={focusInput}
					/>

					<InputPrefixSuffixText onClick={focusInput}>
						{prefixText}
					</InputPrefixSuffixText>

					<div className="kl-flex kl-flex-row kl-flex-1 kl-max-h-full kl-min-h-full kl-h-full">
						<InputPrefixSuffixPlaceholder onClick={focusInput}>
							{prefixPlaceholder}
						</InputPrefixSuffixPlaceholder>

						<input
							ref={combinedRef}
							value={value}
							onChange={handleChange}
							type={currentType}
							{...restProps}
							onFocus={handleFocus}
							onBlur={handleBlur}
							size={htmlSize}
							className={classnames(
								"editable-control-background kl-text-front kl-rounded-control kl-flex-1 kl-max-h-full kl-min-h-full kl-h-full kl-outline-none kl-ring-0 placeholder:kl-text-front-hint focus-visible:kl-outline-none focus-visible:kl-ring-0"
							)}
							disabled={disabled}
						/>

						<InputPrefixSuffixPlaceholder onClick={focusInput}>
							{suffixPlaceholder}
						</InputPrefixSuffixPlaceholder>
					</div>

					<InputPrefixSuffixText onClick={focusInput}>
						{suffixText}
					</InputPrefixSuffixText>

					<InputIcon
						icon={suffixIcon}
						focus={focus}
						size={size}
						onClick={focusInput}
					/>
				</div>

				{isClearButtonVisible && (
					<InputClearButton size={size} onClear={clear} />
				)}
				{isTogglePasswordButtonVisible && (
					<InputPasswordToggleButton
						size={size}
						show={isPasswordVisible}
						onChange={onChangePasswordVisibility}
					></InputPasswordToggleButton>
				)}

				{suffix}

				<InputPrependAppend type="append" focus={focus}>
					{append}
				</InputPrependAppend>
			</div>
		);
	}
);

export default Input;
