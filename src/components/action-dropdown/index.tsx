import React, {
	ReactElement,
	createContext,
	useContext,
	useState,
} from "react";
import Icon, { IconProp } from "../icon";
import { ControlStatusProps, Placement } from "../../common/controls.type";
import classNames from "classnames";
import Dropdown from "../dropdown";

interface ActionDropdownItemProps extends ControlStatusProps {
	icon?: IconProp;
	suffixIcon?: IconProp;

	prefix?: string | ReactElement | ReactElement[];
	suffix?: string | ReactElement | ReactElement[];

	children: string | ReactElement | ReactElement[];
	onClick?: React.MouseEventHandler<HTMLDivElement>;

	primary?: boolean;
	danger?: boolean;

	disabled?: boolean;
	closeAfterClick?: boolean;
}

export const ActionDropdownItem = ({
	children,
	icon,
	suffixIcon,
	prefix,
	suffix,
	success,
	error,
	warning,
	danger,
	primary,
	disabled,
	onClick,
	closeAfterClick = true,
}: ActionDropdownItemProps) => {
	const isDefault = !(success || error || warning || danger || primary);

	const { onClose } = useActionDropdownContext();

	const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (onClick) {
			onClick(e);
		}

		if (closeAfterClick) {
			onClose();
		}
	};

	return (
		<div
			onClick={handleClick}
			className={classNames(
				"kl-flex kl-flex-row kl-items-center kl-gap-2 kl-px-3 control-height-large kl-whitespace-nowrap",
				{
					"kl-cursor-pointer": !disabled,
					"kl-opacity-50 kl-pointer-events-none": disabled,

					"hover:kl-bg-background-hover": isDefault,
					"kl-text-primary hover:kl-bg-primary-hover": primary,
					"kl-text-error hover:kl-bg-error-hover": error || danger,
					"kl-text-warning hover:kl-bg-warning-hover": warning,
					"kl-text-success hover:kl-bg-success-hover": success,
				}
			)}
		>
			<div className="kl-flex kl-flex-row kl-items-center kl-gap-2 kl-flex-1">
				{icon && <Icon icon={icon} />}
				{prefix && <span>{prefix}</span>}
				<span>{children}</span>
			</div>
			{suffix && <span>{suffix}</span>}
			{suffixIcon && <Icon icon={suffixIcon} />}
		</div>
	);
};

interface ActionDropdownContextProps {
	onClose: () => void;
}

const Context = createContext<ActionDropdownContextProps>({
	onClose: () => {},
});

const useActionDropdownContext = () => useContext(Context);

interface ActionDropdownProps {
	button: string | ReactElement | ReactElement[];
	children: string | ReactElement | ReactElement[];
	show: boolean;
	placement?: Placement;
	onClose: () => void;
}

export const ActionDropdown = ({
	children,
	button,
	show,
	placement,
	onClose,
}: ActionDropdownProps) => {
	const contextValue: ActionDropdownContextProps = {
		onClose,
	};

	return (
		<Context.Provider value={contextValue}>
			<Dropdown
				show={show}
				onClickOutside={onClose}
				button={button}
				placement={placement}
			>
				<div className="kl-flex kl-flex-col">{children}</div>
			</Dropdown>
		</Context.Provider>
	);
};
