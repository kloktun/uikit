import React from 'react';
import { ControlsProps } from '../../common/controls.type';
import classnames from 'classnames';
import Spinner from '../spinner';
import Icon, { IconProp } from '../icon';

type ButtonType = "default" | "primary" | "plain" | "borderless" | "text";

export interface ButtonProps extends ControlsProps, Omit<React.HTMLProps<HTMLButtonElement>, "size"> {

    type?: ButtonType;
    htmlType?: "button" | "submit" | "reset",

    loading?: boolean;

    children?: string | React.ReactElement;

    icon?: IconProp;
    suffixIcon?: IconProp;

}


const Button = ({ type = "default", size = "default", loading, disabled, success, error, warning, children, icon, suffixIcon, htmlType = "button", ...restProps }: ButtonProps) => {

    const status = error ? "error" : success ? "success": warning ? "warning" : "default"; 

    return (

        <button type={htmlType} disabled={disabled || loading} {...restProps}  className={
            classnames(
                restProps.className,
                'rounded-control flex flex-row items-center justify-center gap-2 transition-all duration-200 text-ellipsis whitespace-nowrap',
                {
                    // Not text
                    'px-4': type != 'text',

                    // Type
                    'bg-background border': type == 'default',

                    // Default state
                    'text-front fill-front border-stroke hover:bg-background-hover active:bg-background-active': status == "default" && type == 'default',
                    'text-primary-front fill-primary-front bg-primary hover:bg-primary-accent-hover active:bg-primary-accent-active': status == "default" && type == 'primary',
                    'text-primary fill-primary bg-primary-plain  hover:bg-primary-plain-hover active:bg-primary-plain-active': status == "default" && type == 'plain',
                    'text-primary fill-primary hover:text-primary-accent-hover hover:fill-primary-accent-hover active:text-primary-accent-active active:fill-primary-accent-active': status == "default" && (type == 'text' || type == 'borderless'),

                    // Error state
                    'text-error fill-error border-error hover:bg-error-hover active:bg-error-active': status == "error" && type == 'default',
                    'text-error-front fill-error-front bg-error hover:bg-error-accent-hover active:bg-error-accent-active': status == "error" && type == 'primary',
                    'text-error fill-error bg-error-plain  hover:bg-error-plain-hover active:bg-error-plain-active': status == "error" && type == 'plain',
                    'text-error fill-error hover:text-error-accent-hover hover:fill-error-accent-hover active:text-error-accent-active active:fill-error-active': status == "error" && (type == 'text' || type == 'borderless'),
                    
                    // Warning state
                    'text-warning fill-warning border-warning hover:bg-warning-hover active:bg-warning-active': status == "warning" && type == 'default',
                    'text-warning-front fill-warning-front bg-warning hover:bg-warning-accent-hover active:bg-warning-accent-active': status == "warning" && type == 'primary',
                    'text-warning fill-warning bg-warning-plain  hover:bg-warning-plain-hover active:bg-warning-plain-active': status == "warning" && type == 'plain',
                    'text-warning fill-warning hover:text-warning-accent-hover hover:fill-warning-accent-hover active:text-warning-accent-active active:fill-warning-active': status == "warning" && (type == 'text' || type == 'borderless'),
                    
                    // Success state
                    'text-success fill-success border-success hover:bg-success-hover active:bg-success-active': status == "success" && type == 'default',
                    'text-success-front fill-success-front bg-success hover:bg-success-accent-hover active:bg-success-accent-active': status == "success" && type == 'primary',
                    'text-success fill-success bg-success-plain  hover:bg-success-plain-hover active:bg-success-plain-active': status == "success" && type == 'plain',
                    'text-success fill-success hover:text-success-accent-hover hover:fill-success-accent-hover active:text-success-accent-active active:fill-success-active': status == "success" && (type == 'text' || type == 'borderless'),
                                        
                    
                    // Size
                    'control-height-large': type != 'text' && size == 'large',
                    'control-height-medium': type != 'text' && size == 'medium',
                    'control-height-default': type != 'text' && size == 'default',
                    'control-height-small': type != 'text' && size == 'small',
                    'control-height-mini': type != 'text' && size == 'mini',


                    // Loading | Disabled
                    'opacity-50': loading || disabled,

                    // Loading
                    'cursor-wait': loading,

                    // Disabled
                    'cursor-not-allowed': disabled,

                }
            )
        }>

            { loading && <Icon icon={<Spinner size="small"></Spinner>} />}

            { !loading &&  <Icon icon={icon} />}

            { children }
            
            <Icon icon={suffixIcon} />

        </button>
    );


}

export default Button;