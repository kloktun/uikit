import React from 'react';
import classnames from 'classnames';
import Spinner from '../spinner';
import { ControlsProps } from '../../common/controls.type';
import Icon, { IconProp } from '../icon';

type IconButtonType = "default" | "primary" | "plain" | "borderless" | "text" | "primary-borderless" | "primary-text" | "primary-light-borderless" | "primary-light-text" | "light-borderless" | "light-text";

interface IconButtonProps extends ControlsProps, Omit<React.HTMLProps<HTMLButtonElement>, "size"> {

    type?: IconButtonType;

    loading?: boolean;
    htmlType?: "button" | "submit" | "reset",

    icon?: IconProp;
    children?: IconProp;

}

const IconButton = ({ type = "default", size = "default", loading = false, disabled = false, error, success, warning, icon, children, htmlType = "button", ...restProps }: IconButtonProps) => {
    
    const status = error ? "error" : success ? "success": warning ? "warning" : "default"; 

    const isText = ['text', 'primary-text', 'light-text', 'primary-light-text'].includes(type);

    return (
    
        <button type={htmlType} {...restProps} disabled={disabled || loading} className={
            classnames(
                'rounded-control flex flex-row items-center justify-center transition-all duration-200',
                {
                    // Not text
                    'aspect-square': !isText,

                    // Type
                    'bg-background border': type == 'default',

                    // Default state
                    'text-front fill-front border-stroke': status == 'default' && (type == 'default' || type == 'borderless' || type == 'text'),
                    'hover:bg-background-hover active:bg-background-active': status == "default" && type == 'default',
                    'text-primary-front fill-primary-front bg-primary hover:bg-primary-accent-hover active:bg-primary-accent-active': status == "default" && type == 'primary',
                    'text-primary fill-primary bg-primary-plain hover:bg-primary-plain-hover active:bg-primary-plain-active': status == "default" && type == 'plain',
                    'text-primary fill-primary hover:text-primary-accent-hover hover:fill-primary-accent-hover active:text-primary-accent-active active:fill-primary-accent-active': status == "default" && (type == 'primary-borderless' || type == 'primary-text'),
                    'text-front-hint fill-front-hint hover:text-front hover:fill-front active:text-front active:fill-front': status == "default" && (type == 'light-borderless' || type == 'light-text'),
                    'text-primary-light fill-primary-light hover:text-primary hover:fill-primary active:text-primary-accent-active active:fill-primary-accent-active': status == "default" && (type == 'primary-light-borderless' || type == 'primary-light-text'),

                
                    // Error state
                    'text-error fill-error border-error hover:bg-error-hover active:bg-error-active': status == "error" && type == 'default',
                    'text-error-front fill-error-front bg-error hover:bg-error-accent-hover active:bg-error-accent-active': status == "error" && type == 'primary',
                    'text-error fill-error bg-error-plain hover:bg-error-plain-hover active:bg-error-plain-active': status == "error" && type == 'plain',
                    'text-error fill-error hover:text-error-accent-hover hover:fill-error-accent-hover active:text-error-accent-active active:fill-error-accent-active': status == "error" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'text-front-hint fill-front-hint hover:text-error-accent-hover hover:fill-error-accent-hover active:text-error-accent-active active:fill-error-accent-active': status == "error" && (type == 'light-borderless' || type == 'light-text'),
                                        
                    // Warning state
                    'text-warning fill-warning border-warning hover:bg-warning-hover active:bg-warning-active': status == "warning" && type == 'default',
                    'text-warning-front fill-warning-front bg-warning hover:bg-warning-accent-hover active:bg-warning-accent-active': status == "warning" && type == 'primary',
                    'text-warning fill-warning bg-warning-plain hover:bg-warning-plain-hover active:bg-warning-plain-active': status == "warning" && type == 'plain',
                    'text-warning fill-warning hover:text-warning-accent-hover hover:fill-warning-accent-hover active:text-warning-accent-active active:fill-warning-accent-active': status == "warning" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'text-front-hint fill-front-hint hover:text-warning-accent-hover hover:fill-warning-accent-hover active:text-warning-accent-active active:fill-warning-accent-active': status == "warning" && (type == 'light-borderless' || type == 'light-text'),
                                        
                    // Success state
                    'text-success fill-success border-success hover:bg-success-hover active:bg-success-active': status == "success" && type == 'default',
                    'text-success-front fill-success-front bg-success hover:bg-success-accent-hover active:bg-success-accent-active': status == "success" && type == 'primary',
                    'text-success fill-success bg-success-plain hover:bg-success-plain-hover active:bg-success-plain-active': status == "success" && type == 'plain',
                    'text-success fill-success hover:text-success-accent-hover hover:fill-success-accent-hover active:text-success-accent-active active:fill-success-accent-active': status == "success" && (type == 'text' || type == 'borderless' || type == 'primary-borderless' || type == 'primary-text' || type == 'primary-light-borderless' || type == 'primary-light-text'),
                    'text-front-hint fill-front-hint hover:text-success-accent-hover hover:fill-success-accent-hover active:text-success-accent-active active:fill-success-accent-active': status == "success" && (type == 'light-borderless' || type == 'light-text'),
                                                            
                    // Size
                    'icon-control-size-large': !isText && size == 'large',
                    'icon-control-size-medium': !isText && size == 'medium',
                    'icon-control-size-default': !isText && size == 'default',
                    'icon-control-size-small': !isText && size == 'small',
                    'icon-control-size-mini': !isText && size == 'mini',


                    // Loading | Disabled
                    'opacity-50': loading || disabled,

                    // Loading
                    'cursor-wait': loading,

                    // Disabled
                    'cursor-not-allowed': disabled,


                }
            )
        }>

            { loading && <Spinner size={size} /> }

            { !loading &&  <Icon size={size} icon={children ?? icon}></Icon>}            

        </button>

    );


}

export default IconButton;