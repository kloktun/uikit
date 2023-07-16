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
                'kl-rounded-control kl-flex kl-flex-row kl-items-center kl-justify-center kl-gap-2 kl-transition-all kl-duration-200 kl-text-ellipsis kl-whitespace-nowrap',
                {
                    // Not text
                    'kl-px-4': type != 'text',

                    // Type
                    'kl-bg-background kl-border': type == 'default',

                    // Default state
                    'kl-text-front kl-fill-front kl-border-stroke hover:kl-bg-background-hover active:kl-bg-background-active': status == "default" && type == 'default',
                    'kl-text-primary-front kl-fill-primary-front kl-bg-primary hover:kl-bg-primary-accent-hover active:kl-bg-primary-accent-active': status == "default" && type == 'primary',
                    'kl-text-primary kl-fill-primary kl-bg-primary-plain  hover:kl-bg-primary-plain-hover active:kl-bg-primary-plain-active': status == "default" && type == 'plain',
                    'kl-text-primary kl-fill-primary hover:kl-text-primary-accent-hover hover:kl-fill-primary-accent-hover active:kl-text-primary-accent-active active:kl-fill-primary-accent-active': status == "default" && (type == 'text' || type == 'borderless'),

                    // Error state
                    'kl-text-error kl-fill-error kl-border-error hover:kl-bg-error-hover active:kl-bg-error-active': status == "error" && type == 'default',
                    'kl-text-error-front kl-fill-error-front kl-bg-error hover:kl-bg-error-accent-hover active:kl-bg-error-accent-active': status == "error" && type == 'primary',
                    'kl-text-error kl-fill-error kl-bg-error-plain  hover:kl-bg-error-plain-hover active:kl-bg-error-plain-active': status == "error" && type == 'plain',
                    'kl-text-error kl-fill-error hover:kl-text-error-accent-hover hover:kl-fill-error-accent-hover active:kl-text-error-accent-active active:kl-fill-error-active': status == "error" && (type == 'text' || type == 'borderless'),
                    
                    // Warning state
                    'kl-text-warning kl-fill-warning kl-border-warning hover:kl-bg-warning-hover active:kl-bg-warning-active': status == "warning" && type == 'default',
                    'kl-text-warning-front kl-fill-warning-front kl-bg-warning hover:kl-bg-warning-accent-hover active:kl-bg-warning-accent-active': status == "warning" && type == 'primary',
                    'kl-text-warning kl-fill-warning kl-bg-warning-plain  hover:kl-bg-warning-plain-hover active:kl-bg-warning-plain-active': status == "warning" && type == 'plain',
                    'kl-text-warning kl-fill-warning hover:kl-text-warning-accent-hover hover:kl-fill-warning-accent-hover active:kl-text-warning-accent-active active:kl-fill-warning-active': status == "warning" && (type == 'text' || type == 'borderless'),
                    
                    // Success state
                    'kl-text-success kl-fill-success kl-border-success hover:kl-bg-success-hover active:kl-bg-success-active': status == "success" && type == 'default',
                    'kl-text-success-front kl-fill-success-front kl-bg-success hover:kl-bg-success-accent-hover active:kl-bg-success-accent-active': status == "success" && type == 'primary',
                    'kl-text-success kl-fill-success kl-bg-success-plain  hover:kl-bg-success-plain-hover active:kl-bg-success-plain-active': status == "success" && type == 'plain',
                    'kl-text-success kl-fill-success hover:kl-text-success-accent-hover hover:kl-fill-success-accent-hover active:kl-text-success-accent-active active:kl-fill-success-active': status == "success" && (type == 'text' || type == 'borderless'),
                                        
                    
                    // Size
                    'control-height-large': type != 'text' && size == 'large',
                    'control-height-medium': type != 'text' && size == 'medium',
                    'control-height-default': type != 'text' && size == 'default',
                    'control-height-small': type != 'text' && size == 'small',
                    'control-height-mini': type != 'text' && size == 'mini',


                    // Loading | Disabled
                    'kl-opacity-50': loading || disabled,

                    // Loading
                    'kl-cursor-wait': loading,

                    // Disabled
                    'kl-cursor-not-allowed': disabled,

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