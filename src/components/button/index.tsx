import classnames from "classnames";
import React from "react";
import { ControlsProps } from "../../common/controls.type";
import Icon, { IconProp } from "../icon";
import Spinner from "../spinner";

type ButtonType =
	| "default"
	| "primary"
	| "outline"
	| "plain"
	| "borderless"
	| "text";

export interface ButtonProps
	extends ControlsProps,
		Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
	type?: ButtonType;
	htmlType?: "button" | "submit" | "reset";

	loading?: boolean;

	children?: string | string[] | React.ReactElement;

	icon?: IconProp;
	suffixIcon?: IconProp;
}

const Button = ({
	type = "default",
	size = "default",
	loading,
	disabled,
	success,
	error,
	warning,
	children,
	icon,
	suffixIcon,
	htmlType = "button",
	...restProps
}: ButtonProps) => {
	const status = error
		? "error"
		: success
		? "success"
		: warning
		? "warning"
		: "default";

	return (
		<button
			type={htmlType}
			disabled={disabled || loading}
			{...restProps}
			className={classnames(
				restProps.className,
				"kl:rounded-control kl:flex kl:flex-row kl:items-center kl:justify-center kl:gap-2 kl:transition-all kl:duration-200 kl:text-ellipsis kl:whitespace-nowrap kl:select-none",
				{
					// Not text
					"kl:px-4": type != "text",

					// Type
					"kl:bg-background kl:border": type == "default" || type == "outline",

					// Default state
					"kl:text-front kl:fill-front kl:border-stroke kl:hover:bg-background-hover kl:active:bg-background-active":
						status == "default" && type == "default",
					"kl:text-primary-front kl:fill-primary-front kl:bg-primary kl:hover:bg-primary-accent-hover kl:active:bg-primary-accent-active":
						status == "default" && type == "primary",
					"kl:text-primary kl:fill-primary kl:border-primary kl:hover:bg-primary-hover kl:active:bg-primary-active":
						status == "default" && type == "outline",
					"kl:text-primary kl:fill-primary kl:bg-primary-plain  kl:hover:bg-primary-plain-hover kl:active:bg-primary-plain-active":
						status == "default" && type == "plain",
					"kl:text-primary kl:fill-primary kl:hover:text-primary-accent-hover kl:hover:fill-primary-accent-hover kl:active:text-primary-accent-active kl:active:fill-primary-accent-active":
						status == "default" && (type == "text" || type == "borderless"),

					// Error state
					"kl:text-error kl:fill-error kl:border-error-light kl:hover:bg-error-hover kl:active:bg-error-active":
						status == "error" && type == "default",
					"kl:text-error kl:fill-error kl:border-error kl:hover:bg-error-hover kl:active:bg-error-active":
						status == "error" && type == "outline",
					"kl:text-error-front kl:fill-error-front kl:bg-error kl:hover:bg-error-accent-hover kl:active:bg-error-accent-active":
						status == "error" && type == "primary",
					"kl:text-error kl:fill-error kl:bg-error-plain  kl:hover:bg-error-plain-hover kl:active:bg-error-plain-active":
						status == "error" && type == "plain",
					"kl:text-error kl:fill-error kl:hover:text-error-accent-hover kl:hover:fill-error-accent-hover kl:active:text-error-accent-active kl:active:fill-error-active":
						status == "error" && (type == "text" || type == "borderless"),

					// Warning state
					"kl:text-warning kl:fill-warning kl:border-warning-light kl:hover:bg-warning-hover kl:active:bg-warning-active":
						status == "warning" && type == "default",
					"kl:text-warning kl:fill-warning kl:border-warning kl:hover:bg-warning-hover kl:active:bg-warning-active":
						status == "warning" && type == "outline",
					"kl:text-warning-front kl:fill-warning-front kl:bg-warning kl:hover:bg-warning-accent-hover kl:active:bg-warning-accent-active":
						status == "warning" && type == "primary",
					"kl:text-warning kl:fill-warning kl:bg-warning-plain  kl:hover:bg-warning-plain-hover kl:active:bg-warning-plain-active":
						status == "warning" && type == "plain",
					"kl:text-warning kl:fill-warning kl:hover:text-warning-accent-hover kl:hover:fill-warning-accent-hover kl:active:text-warning-accent-active kl:active:fill-warning-active":
						status == "warning" && (type == "text" || type == "borderless"),

					// Success state
					"kl:text-success kl:fill-success kl:border-success-light kl:hover:bg-success-hover kl:active:bg-success-active":
						status == "success" && type == "default",
					"kl:text-success kl:fill-success kl:border-success kl:hover:bg-success-hover kl:active:bg-success-active":
						status == "success" && type == "outline",
					"kl:text-success-front kl:fill-success-front kl:bg-success kl:hover:bg-success-accent-hover kl:active:bg-success-accent-active":
						status == "success" && type == "primary",
					"kl:text-success kl:fill-success kl:bg-success-plain  kl:hover:bg-success-plain-hover kl:active:bg-success-plain-active":
						status == "success" && type == "plain",
					"kl:text-success kl:fill-success kl:hover:text-success-accent-hover kl:hover:fill-success-accent-hover kl:active:text-success-accent-active kl:active:fill-success-active":
						status == "success" && (type == "text" || type == "borderless"),

					// Size
					"kl:control-height-large": type != "text" && size == "large",
					"kl:control-height-medium": type != "text" && size == "medium",
					"kl:control-height-default": type != "text" && size == "default",
					"kl:control-height-small": type != "text" && size == "small",
					"kl:control-height-mini": type != "text" && size == "mini",

					// Loading | Disabled
					"kl:opacity-50": loading || disabled,
					"kl:cursor-pointer": !loading && !disabled,

					// Loading
					"kl:cursor-wait": loading,

					// Disabled
					"kl:cursor-not-allowed": disabled,
				}
			)}
		>
			{loading && <Icon icon={<Spinner size="small"></Spinner>} />}

			{!loading && <Icon icon={icon} />}

			{children}

			<Icon icon={suffixIcon} />
		</button>
	);
};

export default Button;
