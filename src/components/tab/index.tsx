import React, { ReactElement } from "react";
import Icon, { IconProp } from "../icon";
import { ControlsProps } from "../../common/controls.type";
import classNames from "classnames";

export interface TabProps extends Omit<ControlsProps, "size"> {
    
    icon?: IconProp;
    suffixIcon?: IconProp;

    prefix?: ReactElement;
    suffix?: ReactElement;
    
    label: string | IconProp | ReactElement;
    children: ReactElement;

    active?: boolean;
    onClick?: () => void;

}

const Tab = ({ label, icon, suffixIcon, prefix, suffix, active, disabled, onClick }: TabProps) => {

    const handleClick = () => {

        if(disabled || !onClick){
            return;
        }

        onClick();

    }

    return (
        <div
            onClick={handleClick}
            className={
                classNames(
                    'kl-group kl-relative kl-flex kl-flex-row kl-items-center kl-justify-center kl-h-14 kl-gap-1 kl-px-3',
                    {
                        'kl-opacity-50 kl-pointer-events-none': disabled,
                        'kl-cursor-pointer': !disabled,
                        'kl-text-front-secondary hover:kl-text-front': !active
                    }
                )
            }
        >

            {prefix}
            { icon && <Icon icon={icon} />}

            <span className={
                classNames(
                    'kl-whitespace-nowrap kl-font-medium',
                )
            }>
                {label}
            </span>

            { suffixIcon && <Icon icon={suffixIcon} />}
            {suffix}

            <div className={classNames(
                "kl-absolute kl-bottom-0 kl-left-1/2 -kl-translate-x-1/2 kl-h-0.5 kl-rounded-sm kl-rounded-bl-none kl-rounded-br-none kl-w-5",
                {
                    'kl-bg-primary': active,
                    'kl-bg-transparent group-hover:kl-bg-stroke': !active
                }
            )}></div>

        </div>
    );

}

export default Tab;